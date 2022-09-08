import { gql } from "apollo-server";

const typeDefs = gql`
  type Ticket {
    name: String
    slug: String
  }

  type Company {
    name: String
    slug: String
    sector: Sector
    subSector: SubSector
    segment: Segment
    tickets: [Ticket]
  }

  type Sector {
    name: String
    slug: String
    subSectors: [SubSector]
    tickets: [Ticket]
  }

  type SubSector {
    name: String
    slug: String
    segments: [Segment]
    tickets: [Ticket]
  }

  type Segment {
    name: String
    slug: String
    companies: [Company]
    tickets: [Ticket]
  }

  type Query {
    ticket(slug: String): Ticket
    tickets: [Ticket]
    company(slug: String): Company
    companies: [Company]
    sector(slug: String): Sector
    sectors: [Sector]
    subSector(slug: String): SubSector
    subSectors: [SubSector]
    segment(slug: String): Segment
    segments: [Segment]
  }
`;

export default typeDefs;
