import { gql } from "apollo-server";

const typeDefs = gql`
  type IncomeAverage {
    averageIncome: Float
    averageYield: Float
    totalIncome: Float
  }

  type IncomePartial {
    averageAmount: Float
    averageYield: Float
  }

  type Income {
    startDate: String
    endDate: String
    rangeInYears: Float
    incomeTotal: Float
    incomeYield: Float
    range: IncomeAverage
    interest: IncomeAverage
    dividends: IncomeAverage
    others: IncomeAverage
  }

  type Ticket {
    name: String
    slug: String
    price: Float
    company: Company
    income: Income
  }

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
