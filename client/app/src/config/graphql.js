import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const favorites = makeVar([])

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        favorites: {
          read: () => {
            return favorites()
          }
        }
      }
    }
  },
});

const client = new ApolloClient({
  // uri: "http://localhost:4000",
  uri: "http://54.254.234.162:4000/",
  cache: cache,
});

export default client;
