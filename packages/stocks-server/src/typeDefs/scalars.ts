import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Currency
  scalar Rate
`;

export default typeDefs;
