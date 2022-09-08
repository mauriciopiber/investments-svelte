export interface StockMapItem {
  company: string;
  ticket: string;
  sector: string;
  subSector: string;
  segment: string;
  averageYield: number;
  averageValue: number;
}

export interface StocksMap {
  [key: string]: {
    [key: string]: {
      [key: string]: {
        [key: string]: StockMapItem[];
      };
    };
  };
}

export interface DividendsBySector {
  name: string;
  averageYield: number;
  averageValue: number;
  subsectors: DividendsBySubSector[];
}

export interface DividendsBySubSector {
  name: string;
  averageYield: number;
  averageValue: number;
  segments: DividendsBySegment[];
}

export interface DividendsBySegment {
  name: string;
  averageYield: number;
  averageValue: number;
  companies: DividendsByCompany[];
}

export interface DividendsByCompany {
  name: string;
  averageYield: number;
  averageValue: number;
  stocks: StockMapItem[];
}

export type StructuredDividends = DividendsBySector[];
