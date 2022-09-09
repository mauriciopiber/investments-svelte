export interface StockDividends {
  paymentDate: string;
  value: number;
  type: string;
}

type StockIndicators = StockValuationIndicators &
  StockDebtIndicators &
  StockEfficienceIndicators &
  StockGrowIndicators &
  StockRentabilityIndications & {
    /**
     * Equity / Liabilities
     */
    equityLiabilities: number;

    /**
     * Market value
     */
    marketValue: number;
  };

export interface StockValuationIndicators {
  /**
   * Dividend Yields
   */
  dY: number;
  /**
   * Price / Earnings per Share
   */
  pL: number;
  /**
   * Price / Earnings-to-Growth (PEG) Ratio
   */
  pegRatio: number;
  /**
   * Price / VPA
   */
  pVp: number;
  /**
   * Enterprise value / EBITDA
   */
  evEbitda: number;
  /**
   * Enterprise value / EBIT
   */
  evEbit: number;
  /**
   * Price / EBITDA
   */
  pEbitda: number;
  /**
   * Price / EBIT
   */
  pEbit: number;
  /**
   *  Equity value / share
   */
  vpa: number;
  /**
   * Price / Total assets by share
   */
  pAssets: number;
  /**
   * Net earnings / share
   */
  lpa: number;

  /**
   * Price / Net income
   */
  pNetIncome: number;
  /**
   * Price / Working capital
   */
  pWorkingCapital: number;
  /**
   * Price / Net Current Assets
   */
  pNetCurrentAssets: number;
}

export interface StockDebtIndicators {
  /**
   * Net Debt / Equity
   */
  netDebtEquity: number;
  /**
   * Net Debt / Ebitda
   */
  netDebtEbitda: number;
  /**
   * Net Debt / Ebit
   */
  netDebtEbit: number;
  /**
   * Equity / Assets
   */
  equityAssets: number;

  /**
   * Liability / Assets
   */
  liabilityAssets: number;
  /**
   * Current liquidity
   */
  currentLiquidity: number;
}

export interface StockEfficienceIndicators {
  /**
   * Gross Profit / Net Revenue
   */
  grossMargin: number;
  /**
   * Net profit / Net income
   */
  netMargin: number;
  /**
   * Ebitda / Net Income
   */
  ebitdaMargin: number;
  /**
   * Ebit / Net Income
   */
  ebitMargin: number;
}

export interface StockRentabilityIndications {
  /**
   * (net income / equity) * 100
   */
  roe: number;
  /**
   * Net profit / total asset
   */
  roa: number;
  /**
   * (Ebit - Taxes) / (Net Worth + Debt)
   */
  roic: number;
  /**
   * Net income / Average total assets
   */
  assetTurnover: number;
}

export interface StockGrowIndicators {
  /** Compound anual growth rate revenue */
  cargRevenues: number;
  /** Compound anual growth rate profit */
  cargProfit: number;
}

export interface PartialStock {
  /**
   * Stock ticket
   */
  ticket: string;

  /**
   * Stock indicators
   */
  indicators: StockIndicators;
}

export interface Stock extends PartialStock {
  /**
   * Stock ticket
   */
  ticket: string;
  /**
   * Stock company
   */
  company: string;
  /**
   * Stock sector
   */
  sector: string;
  /**
   * Stock subsector
   */
  subSector: string;
  /**
   * Stock segment
   */
  segment: string;
  /**
   * Stock price
   */
  price: number;
  /**
   * Stock dividends
   */
  dividendsList: StockDividends[];
  /**
   * Stock indicators
   */
  indicators: StockIndicators;
}

export type StockIndicatorsKeys = keyof StockIndicators;
