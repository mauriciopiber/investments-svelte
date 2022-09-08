import { gql } from "apollo-server";

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

export default typeDefs;
