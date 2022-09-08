export * from "./spreadsheet";
export * from "./statusinvest";

export * from "./wallet";
export * from "./stock";
export * from "./commands/goal";
export * from "./commands/sector";
export * from "./commands/wallet";
export * from "./commands/profile";

export interface InvestmentRange {
  name: string;
  start: number;
  end: number;
}

export interface DividendsRange {
  value: number;
  rangeYield: number;
  years: number;
  averageYield: number;
  quantity: number;
}
