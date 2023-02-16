const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const baseUrl = "http://localhost:3001/movies/";

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input InputMovie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]
  }
  type ResponseMovie {
    message: String
  }
  extend type Query {
    Movies: [Movie]
    Movie(_id: ID!): Movie
  }
  extend type Mutation {
    addMovie(Movie: InputMovie): Movie
    deleteMovie(_id: ID!): ResponseMovie
    updateMovie(_id: ID!, Movie: InputMovie): ResponseMovie
  }
`;

const redis = new Redis();

const resolvers = {
  Query: {
    Movies: async () => {
      console.log("MASUK MOVIES");
      const movies = await redis.get("Movies");
      if (movies) {
        console.log("REDIS");
        const data = await JSON.parse(movies);
        console.log(data);
        return data;
      } else {
        console.log("AXIOS");
        const { data } = await axios({
          url: baseUrl,
          method: "get",
        });
        console.log(data);
        const Movies = JSON.stringify(data);
        redis.set("Movies", Movies);
        return data;
      }
    },
    Movie: async (parent, args, context, info) => {
      console.log("MASUK MOVIE");
      const { data } = await axios({
        url: baseUrl + args._id,
        method: "get",
      });
      console.log(data[0])
      return data[0];
    },
  },
  Mutation: {
    addMovie: async (_, args) => {
      console.log("MASUK ADDMOVIE");
      const { Movie } = args;
      const { data } = await axios({
        url: baseUrl,
        method: "post",
        data: Movie,
      });
      console.log(data);
      redis.del("Movies");
      return data;
    },
    deleteMovie: async (_, args) => {
      console.log("MASUK DELETEMOVIE");
      const { data } = await axios({
        url: baseUrl + args._id,
        method: "delete",
      });
      console.log(data);
      redis.del("Movies");
      return {
        message: `Successfully delete movie`,
      };
    },
    updateMovie: async (_, args) => {
      console.log("MASUK UPDATEMOVIE");
      const { title, overview, poster_path, popularity, tags } = args.Movie;
      const { data } = await axios({
        url: baseUrl + args._id,
        method: "put",
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        },
      });
      console.log(data);
      redis.del("Movies");
      return {
        message: `Successfully update movie`,
      };
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
