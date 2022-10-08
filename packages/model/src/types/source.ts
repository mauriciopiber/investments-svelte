import type { WithId } from "mongodb";
import type { PartialIndicators } from "./ticket";

export interface StockDividends {
  paymentDate: string;
  value: number;
  type: string;
}

export interface StockSource extends PartialIndicators {
  ticket: string;
  url: string;
  currentPrice?: number;
  /**
   * Stock company
   */
  company?: string;
  /**
   * Stock company
   */
  code?: string;
  /**
   * Stock company
   */
  name?: string;
  /**
   * Stock sector
   */
  sector?: string;
  /**
   * Stock subsector
   */
  subSector?: string;
  /**
   * Stock segment
   */
  segment?: string;

  dividends?: StockDividends[];
}

export type StockSourceWithId = WithId<StockSource>;
