import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Currency
  scalar Rate

  type IncomeAverage {
    averageAmount: Currency
    averageYield: Rate
    totalIncome: Float
  }

  type IncomePartial {
    averageAmount: Currency
    averageYield: Rate
  }

  type Income {
    startDate: String
    endDate: String
    rangeInYears: Float
    incomeTotal: Currency
    incomeYield: Rate
    range: IncomeAverage
    interest: IncomeAverage
    dividends: IncomeAverage
    others: IncomeAverage
  }

  type Ticket {
    name: String
    slug: String
    currentPrice: Currency
    company: Company
    income: Income
    maxMonth: Currency
    minMonth: Currency
    maxYear: Currency
    minYear: Currency

    tagAlong: Rate
    liquidezMediaDiaria: Currency
    participacaoIbov: Rate

    dividendsYield: Rate
    precoAtualPorLucroPorAcao: Float
    pegRatio: Float
    precoAtualPorValorPatrimonialPorAcao: Float
    valorDeFirmaPorEBITDA: Float
    valorDeFirmaPorEBIT: Float
    precoAtualPorEBITDA: Float
    precoAtualPorEBIT: Float
    patrimonioLiquidoPorNumeroDeAcoes: Float
    precoAtualPorAtivos: Float
    lucroLiquidoPorNumeroDeAcoes: Float
    precoAtualPorReceitaLiquidaPorAcao: Float
    precoAtualPorAtivoCirculanteMenosPassivoCirculante: Float
    precoAtualPorAtivosCirculanesLiquidosPorAcao: Float
    dividaLiquidaPorPatrimonioLiquido: Float
    dividaLiquidaPorEBITDA: Float
    dividaLiquidaPorEBIT: Float
    patrimonioLiquidoPorAtivos: Float
    passivosPorAtivos: Float
    ativoCirculantePorPassivoCirculante: Float
    lucroBrutoPorReceitaLiquida: Rate
    EBITDAPorReceitaLiquida: Rate
    EBITPorReceitaLiquida: Rate
    lucroLiquidoPorReceitaLiquida: Rate
    lucroLiquidoPorPatrimonioLiquido: Rate
    lucroLiquidoPorAtivoTotal: Rate
    ebitMenosImpostosPorPatrimonioLiquidoMaisEndividamento: Rate
    receitaLiquidaPorTotalMedioDeAtivos: Float
    compoundAnnualGrowthRateReceita5Anos: Rate
    compoundAnnualGrowthRateLucro5Anos: Rate
    patrimonioLiquido: Currency
    ativos: Currency
    ativoCirculante: Currency
    dividaBruta: Currency
    disponibilidade: Currency
    dividaLiquida: Currency
    valorDeMercado: Currency
    valorDeFirma: Currency
    quantidadeDePapeis: Float
    segmentoDeListagem: String
    freeFloat: Rate
    investidores: Int
    instituicional: Int
    pessoaJuridica: Int
    pessoaFisica: Int
    intrinsicValue: Currency
    intrinsicRate: Rate
  }

  type Company {
    name: String
    slug: String
    sector: Sector
    subSector: SubSector
    segment: Segment
    tickets: [Ticket]
    income: IncomePartial
  }

  type Sector {
    name: String
    slug: String
    subSectors: [SubSector]
    tickets: [Ticket]
    income: IncomePartial
  }

  type SubSector {
    name: String
    slug: String
    segments: [Segment]
    tickets: [Ticket]
    income: IncomePartial
    sector: Sector
  }

  type Segment {
    name: String
    slug: String
    companies: [Company]
    tickets: [Ticket]
    income: IncomePartial
    sector: Sector
    subSector: SubSector
  }

  type Portfolio {
    ticket: Ticket
    objective: Int
    current: Int
    averagePrice: Currency
    liquidationAmount: Currency
    liquidationRate: Rate
    investmentAmount: Currency
    objectiveDividends: Currency
    currentDividends: Currency
  }

  input Sort {
    key: String
    order: Int
  }

  type Range {
    min: Float
    max: Float
  }

  type FilterRange {
    key: String
    range: Range
  }

  input SearchRange {
    min: Float
    max: Float
    nullable: Boolean
  }

  input Search {
    key: String
    range: SearchRange
  }

  type SearchResponse {
    count: Int
    tickets: [Ticket]
  }

  type IndicatorGroup {
    name: String
    indicators: [Indicator]
  }

  type Indicator {
    label: String
    key: String
  }

  type Query {
    indicatorsGroups: [IndicatorGroup]
    search(input: [Search]): SearchResponse
    filters: [FilterRange]
    ticket(slug: String): Ticket
    tickets: [Ticket]
    portfolios: [Portfolio]
    portfolio(slug: String): Portfolio
    company(slug: String): Company
    companies(limit: Int, offset: Int, sort: Sort): [Company]
    sector(slug: String): Sector
    sectors: [Sector]
    subSector(slug: String): SubSector
    subSectors: [SubSector]
    segment(slug: String): Segment
    segments: [Segment]
  }
`;

export default typeDefs;
