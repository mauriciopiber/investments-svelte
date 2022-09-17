export interface PartialIncome {
  averageAmount: number;
  averageYield: number;
}

export interface AverageIncome {
  averageAmount: number;
  averageYield: number;
  totalIncome: number;
}

export interface Income {
  startDate: Date;
  endDate: Date;
  rangeInYears: number;
  range: AverageIncome;
  interest: AverageIncome;
  dividends: AverageIncome;
  others: AverageIncome;
  incomeTotal: number;
  incomeYield: number;
}
