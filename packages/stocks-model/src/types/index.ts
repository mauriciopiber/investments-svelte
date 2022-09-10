import type DataLoader from "dataloader";
import type { ObjectId, WithId } from "mongodb";

export interface Sector {
  name: string;
  slug: string;
  income: PartialIncome;
}

export type SectorWithId = WithId<Sector>;

export interface SubSector {
  name: string;
  slug: string;
  sectorId: ObjectId;
  income: PartialIncome;
}

export type SubSectorWithId = WithId<SubSector>;

export interface Segment {
  name: string;
  slug: string;
  subSectorId: ObjectId;
  income: PartialIncome;
}

export type SegmentWithId = WithId<Segment>;

export interface Company {
  company: string;
  name: string;
  code: string;
  slug: string;
  sectorId: ObjectId;
  subSectorId: ObjectId;
  segmentId: ObjectId;
  income: PartialIncome;
}

export interface PartialIncome {
  averageAmount: number;
  averageYield: number;
}

export type CompanyWithId = WithId<Company>;

export interface Ticket {
  name: string;
  slug: string;
  companyId: ObjectId;
  price: number;
  income: Income;
}

export type TicketWithId = WithId<Ticket>;

export interface AverageIncome {
  averageIncome: number;
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

export interface SectorQuery extends Sector {
  subSectors: SubSectorQuery[];
}

export interface SubSectorQuery extends SubSector {
  segments: SegmentQuery[];
  sector: SectorQuery;
}

export interface SegmentQuery extends Segment {
  companies: CompanyQuery[];
  subSector: SubSectorQuery;
}

export interface CompanyQuery extends Company {
  tickets: TicketQuery[];
  segment: SegmentQuery;
  subSector: SubSectorQuery;
  sector: SectorQuery;
}

export interface TicketQuery extends Ticket {
  company: CompanyQuery;
}

export interface StockDividends {
  paymentDate: string;
  value: number;
  type: string;
}

export type StockIndicators = StockValuationIndicators &
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
   * Stock company
   */
  company: string;
  /**
   * Stock company
   */
  code: string;
  /**
   * Stock company
   */
  name: string;
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
}

export type StockWithId = WithId<Stock>;

export interface Portfolio {
  ticket: string;
  custody: number;
  target: number;
  averagePrice: number;
}

export type PortfolioWithId = WithId<Portfolio>;

export interface DataLoaders {
  companiesLoader: DataLoader<ObjectId, Company>;
}
