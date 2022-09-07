import { ApolloServer, gql } from "apollo-server";
import resolvers from "./resolvers/stocks";

const typeDefs = gql`
  type Stock {
    ticket: String
    company: String
  }

  type Query {
    stock(ticket: String): Stock
    stocks: [Stock]
  }
`;

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
  `);
});
