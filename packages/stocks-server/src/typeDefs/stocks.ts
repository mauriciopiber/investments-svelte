import { gql } from "apollo-server";

const typeDefs = gql`
  type IncomeAverage {
    averageAmount: Float
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
    currentPrice: Float
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

  type Portfolio {
    ticket: Ticket
    objective: Int
    current: Int
    averagePrice: Float
  }

  input Sort {
    key: String
    order: Int
  }

  type Range {
    min: Float
    max: Float
  }

  type FilterRange {
    key: String
    range: Range
  }

  input SearchRange {
    min: Float
    max: Float
  }

  input Search {
    key: String
    range: SearchRange
  }

  type SearchResponse {
    count: Int
    tickets: [Ticket]
  }

  type Query {
    search(input: [Search]): SearchResponse
    filters: [FilterRange]
    ticket(slug: String): Ticket
    tickets: [Ticket]
    portfolios: [Portfolio]
    portfolio(slug: String): Portfolio
    company(slug: String): Company
    companies(limit: Int, offset: Int, sort: Sort): [Company]
    sector(slug: String): Sector
    sectors: [Sector]
    subSector(slug: String): SubSector
    subSectors: [SubSector]
    segment(slug: String): Segment
    segments: [Segment]
  }
`;

export default typeDefs;
