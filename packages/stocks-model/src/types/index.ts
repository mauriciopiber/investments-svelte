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
  ticketId: ObjectId;
  current: number;
  objective: number;
  averagePrice: number;
}

export interface PortfolioQuery extends Portfolio {
  ticket: TicketQuery;
}

export type PortfolioWithId = WithId<Portfolio>;

type NullableNumber = number | null;

export interface StockSource {
  ticket: string;
  url: string;
  currentPrice?: number | null;
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

  minMonth?: NullableNumber;
  maxMonth?: NullableNumber;
  minYear?: NullableNumber;
  maxYear?: NullableNumber;

  tagAlong?: NullableNumber;

  // Média ultimos 30 dias
  liquidezMediaDiaria?: NullableNumber;

  participacaoIbov?: NullableNumber;

  // valuation
  dividendsYield?: NullableNumber;

  precoAtualPorLucroPorAcao?: NullableNumber;

  pegRatio?: NullableNumber;

  precoAtualPorValorPatrimonialPorAcao?: NullableNumber;

  valorDeFirmaPorEBITDA?: NullableNumber;

  valorDeFirmaPorEBIT?: NullableNumber;

  precoAtualPorEBITDA?: NullableNumber;

  precoAtualPorEBIT?: NullableNumber;

  patrimonioLiquidoPorNumeroDeAcoes?: NullableNumber;

  precoAtualPorAtivos?: NullableNumber;

  lucroLiquidoPorNumeroDeAcoes?: NullableNumber;

  precoAtualPorReceitaLiquidaPorAcao?: NullableNumber;

  precoAtualPorAtivoCirculanteMenosPassivoCirculante?: NullableNumber;

  precoAtualPorAtivosCirculanesLiquidosPorAcao?: NullableNumber;

  dividaLiquidaPorPatrimonioLiquido?: NullableNumber;

  dividaLiquidaPorEBITDA?: NullableNumber;

  dividaLiquidaPorEBIT?: NullableNumber;

  patrimonioLiquidoPorAtivos?: NullableNumber;

  passivosPorAtivos?: NullableNumber;

  ativoCirculantePorPassivoCirculante?: NullableNumber;

  lucroBrutoPorReceitaLiquida?: NullableNumber;

  EBITDAPorReceitaLiquida?: NullableNumber;

  EBITPorReceitaLiquida?: NullableNumber;

  lucroLiquidoPorReceitaLiquida?: NullableNumber;

  lucroLiquidoPorPatrimonioLiquido?: NullableNumber;

  lucroLiquidoPorAtivoTotal?: NullableNumber;

  ebitMenosImpostosPorPatrimonioLiquidoMaisEndividamento?: NullableNumber;

  receitaLiquidaPorTotalMedioDeAtivos?: NullableNumber;

  compoundAnnualGrowthRateReceita5Anos?: NullableNumber;

  compoundAnnualGrowthRateLucro5Anos?: NullableNumber;

  patrimonioLiquido?: NullableNumber;

  ativos?: NullableNumber;

  ativoCirculante?: NullableNumber;

  dividaBruta?: NullableNumber;

  disponibilidade?: NullableNumber;
  dividaLiquida?: NullableNumber;
  valorDeMercado?: NullableNumber;
  valorDeFirma?: NullableNumber;
  quantidadeDePapeis?: NullableNumber;

  segmentoDeListagem?: string | null;

  freeFloat?: NullableNumber;

  investidores?: NullableNumber;

  instituicional?: NullableNumber;
  pessoaJuridica?: NullableNumber;
  pessoaFisica?: NullableNumber;

  dividends: StockDividends[];
}

export type StockFilterTypes = keyof StockSource;

export type StockFilter = {
  [key in StockFilterTypes]: {
    min: number;
    max: number;
  };
};

export interface Filter {
  key: StockFilterTypes;
  range: {
    min: number;
    max: number;
  };
}
