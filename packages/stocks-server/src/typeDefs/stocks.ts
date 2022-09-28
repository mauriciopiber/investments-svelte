import { gql } from "apollo-server";

const typeDefs = gql`
  type Company {
    name: String
    slug: String
    sector: Sector
    subSector: SubSector
    segment: Segment
    tickets: [Ticket]
    income: IncomePartial
  }

  type Sector {
    name: String
    slug: String
    subSectors: [SubSector]
    tickets: [Ticket]
    income: IncomePartial
  }

  type SubSector {
    name: String
    slug: String
    segments: [Segment]
    tickets: [Ticket]
    income: IncomePartial
    sector: Sector
  }

  type Segment {
    name: String
    slug: String
    companies: [Company]
    tickets: [Ticket]
    income: IncomePartial
    sector: Sector
    subSector: SubSector
  }

  type Portfolio {
    ticket: Ticket
    objective: Int
    current: Int
    averagePrice: Currency
    liquidationAmount: Currency
    liquidationRate: Rate
    investmentAmount: Currency
    objectiveDividends: Currency
    currentDividends: Currency
  }

  type Query {
    portfolios: [Portfolio]
    portfolio(slug: String): Portfolio
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
