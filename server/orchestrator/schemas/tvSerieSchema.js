const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const baseUrl = "http://localhost:3002/tv/";

const typeDefs = gql`
  type TvSerie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input InputTvSerie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]
  }
  type ResponseTvSerie {
    message: String
  }
  extend type Query {
    TvSeries: [TvSerie]
    TvSerie(_id: ID!): TvSerie
  }
  extend type Mutation {
    addTvSerie(TvSerie: InputTvSerie): TvSerie
    deleteTvSerie(_id: ID!): ResponseTvSerie
    updateTvSerie(_id: ID!, TvSerie: InputTvSerie): ResponseTvSerie
  }
`;

const redis = new Redis();

const resolvers = {
  Query: {
    TvSeries: async () => {
      console.log("MASUK TVSERIES");
      const tvseries = await redis.get("TvSeries");
      if (tvseries) {
        console.log("SINI");
        const data = await JSON.parse(tvseries);
        console.log(data);
        return data;
      } else {
        console.log("SANA");
        const { data } = await axios({
          url: baseUrl,
          method: "get",
        });
        console.log(data);
        const TvSeries = JSON.stringify(data);
        redis.set("TvSeries", TvSeries);
        return data;
      }
    },
    TvSerie: async (parent, args, context, info) => {
      console.log("MASUK TVSERIE");
      const { data } = await axios({
        url: baseUrl + args._id,
        method: "get",
      });
      return data[0];
    },
  },
  Mutation: {
    addTvSerie: async (_, args) => {
      console.log("MASUK ADDTVSERIE");
      const { TvSerie } = args;
      const { data } = await axios({
        url: baseUrl,
        method: "post",
        data: TvSerie,
      });
      console.log(data);
      redis.del("TvSeries");
      return data;
    },
    deleteTvSerie: async (_, args) => {
      console.log("MASUK DELETETVSERIE");
      const { data } = await axios({
        url: baseUrl + args._id,
        method: "delete",
      });
      console.log(data);
      redis.del("TvSeries");
      return {
        message: `Successfully delete tvserie`,
      };
    },
    updateTvSerie: async (_, args) => {
      console.log("MASUK UPDATETVSERIE");
      const { title, overview, poster_path, popularity, tags } = args.TvSerie;
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
      redis.del("TvSeries");
      return {
        message: `Successfully update tvserie`,
      };
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
