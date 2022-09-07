import {
  D_Y,
  TICKER,
  DIVIDA_LIQUIDA_EBIT,
  DIVIDA_LIQUIDA_PATRIMONIO,
  VALOR_DE_MERCADO,
  VPA,
  P_VP,
  PRECO,
  PEG_RATIO,
  PASSIVOS_ATIVOS,
  PATRIMONIO_ATIVOS,
  PSR,
  P_ATIVOS,
  P_ATIVO_CIRCULANTE_LIQ,
  P_CAP_GIRO,
  P_EBIT,
  P_L,
  MARGEM_BRUTA,
  MARGEM_EBIT,
  MARGEM_LIQUIDA,
  CARG_LUCRO_5_ANOS,
  CARG_RECEITA_5_ANOS,
  EV_EBIT,
  ROA,
  ROE,
  ROIC,
  GIRO_ATIVOS,
  LIQUIDEZ_CORRENTE,
  LIQUIDEZ_MEDIA_DIARIA,
  LPA,
} from "../constants";
import type { StockDividends } from "./stock";

export interface StatusInvestCsvStock {
  [TICKER]: string;
  [PRECO]: string;
  [D_Y]: string;
  [P_L]: string;
  [P_VP]: string;
  [P_ATIVOS]: string;
  [MARGEM_BRUTA]: string;
  [MARGEM_EBIT]: string;
  [MARGEM_LIQUIDA]: string;
  [P_EBIT]: string;
  [EV_EBIT]: string;
  [DIVIDA_LIQUIDA_EBIT]: string;
  [DIVIDA_LIQUIDA_PATRIMONIO]: string;
  [PSR]: string;
  [P_CAP_GIRO]: string;
  [P_ATIVO_CIRCULANTE_LIQ]: string;
  [LIQUIDEZ_CORRENTE]: string;
  [ROE]: string;
  [ROA]: string;
  [ROIC]: string;
  [PATRIMONIO_ATIVOS]: string;
  [PASSIVOS_ATIVOS]: string;
  [GIRO_ATIVOS]: string;
  [CARG_RECEITA_5_ANOS]: string;
  [CARG_LUCRO_5_ANOS]: string;
  [LIQUIDEZ_MEDIA_DIARIA]: string;
  [VPA]: string;
  [LPA]: string;
  [PEG_RATIO]: string;
  [VALOR_DE_MERCADO]: string;
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

interface StockPageIndicators {
  [key: string]: number;
}

export interface StockPageData {
  dividendsList: StockDividends[];
  price: number;
  sector: string;
  subSector: string;
  segment: string;
  indicators: StockPageIndicators;
  company: string;
}
