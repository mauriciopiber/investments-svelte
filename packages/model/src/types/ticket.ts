import type { WithId, ObjectId } from "mongodb";
import type { Income } from "./income";

export interface Indicators {
  currentPrice: number;
  minMonth: number | null;
  maxMonth: number | null;
  minYear: number | null;
  maxYear: number | null;

  tagAlong: number | null;

  // Média ultimos 30 dias
  liquidezMediaDiaria: number | null;

  participacaoIbov: number | null;

  // valuation
  dividendsYield: number | null;

  precoAtualPorLucroPorAcao: number | null;

  pegRatio: number | null;

  precoAtualPorValorPatrimonialPorAcao: number | null;

  valorDeFirmaPorEBITDA: number | null;

  valorDeFirmaPorEBIT: number | null;

  precoAtualPorEBITDA: number | null;

  precoAtualPorEBIT: number | null;

  patrimonioLiquidoPorNumeroDeAcoes: number | null;

  precoAtualPorAtivos: number | null;

  lucroLiquidoPorNumeroDeAcoes: number | null;

  precoAtualPorReceitaLiquidaPorAcao: number | null;

  precoAtualPorAtivoCirculanteMenosPassivoCirculante: number | null;

  precoAtualPorAtivosCirculanesLiquidosPorAcao: number | null;

  dividaLiquidaPorPatrimonioLiquido: number | null;

  dividaLiquidaPorEBITDA: number | null;

  dividaLiquidaPorEBIT: number | null;

  patrimonioLiquidoPorAtivos: number | null;

  passivosPorAtivos: number | null;

  ativoCirculantePorPassivoCirculante: number | null;

  lucroBrutoPorReceitaLiquida: number | null;

  EBITDAPorReceitaLiquida: number | null;

  EBITPorReceitaLiquida: number | null;

  lucroLiquidoPorReceitaLiquida: number | null;

  lucroLiquidoPorPatrimonioLiquido: number | null;

  lucroLiquidoPorAtivoTotal: number | null;

  ebitMenosImpostosPorPatrimonioLiquidoMaisEndividamento: number | null;

  receitaLiquidaPorTotalMedioDeAtivos: number | null;

  compoundAnnualGrowthRateReceita5Anos: number | null;

  compoundAnnualGrowthRateLucro5Anos: number | null;

  patrimonioLiquido: number | null;

  ativos: number | null;

  ativoCirculante: number | null;

  dividaBruta: number | null;

  intrinsicValue: number | null;
  intrinsicRate: number | null;

  disponibilidade: number | null;
  dividaLiquida: number | null;
  valorDeMercado: number | null;
  valorDeFirma: number | null;
  quantidadeDePapeis: number | null;

  segmentoDeListagem: string | null;

  freeFloat: number | null;

  investidores: number | null;

  instituicional: number | null;
  pessoaJuridica: number | null;
  pessoaFisica: number | null;
}

export type PartialIndicators = Partial<Indicators>;

export interface Ticket extends Indicators {
  name: string;
  slug: string;
  companyId: ObjectId;
  income: Income;
}

export type TicketWithId = WithId<Ticket>;
