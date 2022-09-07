export interface WalletStockReport {
  ticket: string;
  sector: string;
  subSector: string;
  segment: string;
  custody: number;
  strategyCustody: number;
  missingCustody: number;
  investmentRequired: number;
  currentDividends: number;
  targetDividends: number;
  averageValue: number;
  averageYield: number;
  liquidationValue: number;
  currentValue: number;
  intrinsictValue: number;
  objectiveStrategy: number;
  objectiveValue: number;
  objectiveCustody: number;
  objectiveInvestment: number;
  diffIntrinsicValue: number;
  rateDiffIntrinsicValue: number;
}

export interface WalletStockRateReport extends WalletStockReport {
  liquidationRate: number;
  investmentRate: number;
}
