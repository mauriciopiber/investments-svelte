import { gql } from "apollo-server";

const typeDefs = gql`
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

  type Pagination {
    total: Int
    current: Int
    start: Int
    items: Int
    end: Int
    next: Int
    prev: Int
  }

  type TicketResponse {
    items: [Ticket]
    page: Pagination
  }

  input QueryPage {
    current: Int
    perPage: Int
  }

  input QuerySort {
    key: String
    direction: String
  }

  input QueryInput {
    page: QueryPage
    sort: QuerySort
  }

  type Query {
    indicatorsGroups: [IndicatorGroup]
    search(input: [Search]): SearchResponse
    filters: [FilterRange]
    ticket(slug: String): Ticket
    tickets(input: QueryInput!): TicketResponse
  }
`;

export default typeDefs;
