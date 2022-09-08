import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers/stocks";
import typeDefs from "./typeDefs/stocks";

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at http://localhost:4000
  `);
});
