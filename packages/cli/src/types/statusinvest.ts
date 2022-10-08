import { TICKER } from "../constants";

export interface StatusInvestCsvStock {
  [TICKER]: string;
}

export interface StatusInvestDividends {
  y: number;
  m: number;
  d: number;
  ad: number | null;
  ed: string;
  pd: string;
  et: string;
  etd: string;
  v: number;
  ov: number | null;
  sv: string;
  sov: string;
  adj: boolean;
}
