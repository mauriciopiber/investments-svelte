import { gql } from "apollo-server";

const typeDefs = gql`
  type IncomeAverage {
    averageAmount: Currency
    averageYield: Rate
    totalIncome: Float
  }

  type IncomePartial {
    averageAmount: Currency
    averageYield: Rate
  }

  type Income {
    startDate: String
    endDate: String
    rangeInYears: Float
    incomeTotal: Currency
    incomeYield: Rate
    range: IncomeAverage
    interest: IncomeAverage
    dividends: IncomeAverage
    others: IncomeAverage
  }
`;

export default typeDefs;
