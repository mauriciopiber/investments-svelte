import type {
  PartialStock,
  StockIndicators,
} from "@pibernetwork/stocks-model/src/types";
import type { StockPageData } from "./statusinvest";

export interface StockDividends {
  paymentDate: string;
  value: number;
  type: string;
}

export interface AverageDividends {
  averageYield: number;
  averageValue: number;
}

export type StockIndicatorsKeys = keyof StockIndicators;

export interface StockFilter {
  type: "min" | "max";
  value: number;
  indicator: StockIndicatorsKeys;
}

export type StockFilters = StockFilter[];

export interface StockWithPageData {
  stock: PartialStock;
  pageData: StockPageData;
}
