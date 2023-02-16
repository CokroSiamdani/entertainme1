const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const tvSerieSchema = require("./schemas/tvSerieSchema");
const movieSchema = require("./schemas/movieSchema");

const typeDefs = gql`
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    tvSerieSchema.typeDefs,
    movieSchema.typeDefs
  ],
  resolvers: [
    tvSerieSchema.resolvers,
    movieSchema.resolvers
  ]
})

const server = new ApolloServer({ schema })

server.listen().then(({ url }) => console.log('Orchestrator is running at', url));