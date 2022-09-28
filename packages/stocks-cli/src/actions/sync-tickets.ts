import type {
  Ticket,
  Income,
  StockSourceWithId,
} from "@pibernetwork/stocks-model/src/types";
import slug from "slug";
import { calculateDividends } from "src/stocks/dividends";
import { isNumber } from "$utils/isNumber";

import {
  connection,
  companyRepository,
  ticketRepository,
  sourceRepository,
} from "@pibernetwork/stocks-model/src/containers/root";

function calculateGraham(
  patrimonioLiquidoPorNumeroDeAcoes: number | null | undefined,
  lucroLiquidoPorNumeroDeAcoes: number | null | undefined,
  currentPrice: number | null
) {
  if (typeof patrimonioLiquidoPorNumeroDeAcoes !== "number") {
    throw new Error(`Missing VPA for Graham`);
  }

  if (typeof lucroLiquidoPorNumeroDeAcoes !== "number") {
    throw new Error("Missing LPA for Graham");
  }

  if (typeof currentPrice !== "number") {
    throw new Error("Missing Current Price for Graham");
  }

  if (currentPrice === 0) {
    return {
      intrinsicValue: 0,
      intrinsicRate: 0,
    };
  }

  const valuation =
    22.5 * patrimonioLiquidoPorNumeroDeAcoes * lucroLiquidoPorNumeroDeAcoes;

  if (!isNumber(valuation) || valuation <= 0) {
    return {
      intrinsicValue: 0,
      intrinsicRate: 0,
    };
  }
  const intrinsicValue = Math.sqrt(valuation);

  const diffIntrinsicValue = currentPrice - intrinsicValue;
  const rateDiffIntrinsicValue = (diffIntrinsicValue * 100) / currentPrice;

  if (!isNumber(rateDiffIntrinsicValue)) {
    throw new Error(
      `Rate diff is not a number: ${rateDiffIntrinsicValue} ${diffIntrinsicValue} ${currentPrice} ${intrinsicValue}`
    );
  }

  return {
    intrinsicValue,
    intrinsicRate: rateDiffIntrinsicValue,
  };
}

export async function syncTickets(rangeInYears: number) {
  await connection.init();
  const stocks: StockSourceWithId[] = await sourceRepository.queryAll({});

  for (const stock of stocks) {
    const companyModel = await companyRepository.queryOne({
      name: { $eq: stock.name },
    });

    if (!companyModel) {
      throw new Error();
    }

    if (stock.dividends === undefined) {
      throw new Error(`Missing dividends for ${stock.name} ${stock.ticket}`);
    }

    if (stock.currentPrice === undefined || stock.currentPrice === null) {
      throw new Error(
        `Missing current price for ${stock.name} ${stock.ticket}`
      );
    }

    // console.log(rangeInYears);

    const income: Income = calculateDividends(
      stock.dividends,
      stock.currentPrice,
      rangeInYears
    );

    const intrinsic = calculateGraham(
      stock.patrimonioLiquidoPorNumeroDeAcoes,
      stock.lucroLiquidoPorNumeroDeAcoes,
      stock.currentPrice
    );

    const ticket: Ticket = {
      name: stock.ticket,
      companyId: companyModel._id,
      slug: slug(stock.ticket),
      income,
      currentPrice: stock.currentPrice,

      minMonth: stock.minMonth || null,
      maxMonth: stock.maxMonth || null,
      minYear: stock.minYear || null,
      maxYear: stock.maxYear || null,

      tagAlong: stock.tagAlong || null,

      // Média ultimos 30 dias
      liquidezMediaDiaria: stock.liquidezMediaDiaria || null,

      participacaoIbov: stock.participacaoIbov || null,

      // valuation
      dividendsYield: stock.dividendsYield || null,

      precoAtualPorLucroPorAcao: stock.precoAtualPorLucroPorAcao || null,

      pegRatio: stock.pegRatio || null,

      precoAtualPorValorPatrimonialPorAcao:
        stock.precoAtualPorValorPatrimonialPorAcao || null,

      valorDeFirmaPorEBITDA: stock.valorDeFirmaPorEBITDA || null,

      valorDeFirmaPorEBIT: stock.valorDeFirmaPorEBIT || null,

      precoAtualPorEBITDA: stock.precoAtualPorEBITDA || null,

      precoAtualPorEBIT: stock.precoAtualPorEBIT || null,

      patrimonioLiquidoPorNumeroDeAcoes:
        stock.patrimonioLiquidoPorNumeroDeAcoes || null,

      precoAtualPorAtivos: stock.precoAtualPorAtivos || null,

      lucroLiquidoPorNumeroDeAcoes: stock.lucroLiquidoPorNumeroDeAcoes || null,

      precoAtualPorReceitaLiquidaPorAcao:
        stock.precoAtualPorReceitaLiquidaPorAcao || null,

      precoAtualPorAtivoCirculanteMenosPassivoCirculante:
        stock.precoAtualPorAtivoCirculanteMenosPassivoCirculante || null,

      precoAtualPorAtivosCirculanesLiquidosPorAcao:
        stock.precoAtualPorAtivosCirculanesLiquidosPorAcao || null,

      dividaLiquidaPorPatrimonioLiquido:
        stock.dividaLiquidaPorPatrimonioLiquido || null,

      dividaLiquidaPorEBITDA: stock.dividaLiquidaPorEBITDA || null,

      dividaLiquidaPorEBIT: stock.dividaLiquidaPorEBIT || null,

      patrimonioLiquidoPorAtivos: stock.patrimonioLiquidoPorAtivos || null,

      passivosPorAtivos: stock.passivosPorAtivos || null,

      ativoCirculantePorPassivoCirculante:
        stock.ativoCirculantePorPassivoCirculante || null,

      lucroBrutoPorReceitaLiquida: stock.lucroBrutoPorReceitaLiquida || null,

      EBITDAPorReceitaLiquida: stock.EBITDAPorReceitaLiquida || null,

      EBITPorReceitaLiquida: stock.EBITPorReceitaLiquida || null,

      lucroLiquidoPorReceitaLiquida:
        stock.lucroLiquidoPorReceitaLiquida || null,

      lucroLiquidoPorPatrimonioLiquido:
        stock.lucroLiquidoPorPatrimonioLiquido || null,

      lucroLiquidoPorAtivoTotal: stock.lucroLiquidoPorAtivoTotal || null,

      ebitMenosImpostosPorPatrimonioLiquidoMaisEndividamento:
        stock.ebitMenosImpostosPorPatrimonioLiquidoMaisEndividamento || null,

      receitaLiquidaPorTotalMedioDeAtivos:
        stock.receitaLiquidaPorTotalMedioDeAtivos || null,

      compoundAnnualGrowthRateReceita5Anos:
        stock.compoundAnnualGrowthRateReceita5Anos || null,

      compoundAnnualGrowthRateLucro5Anos:
        stock.compoundAnnualGrowthRateLucro5Anos || null,

      patrimonioLiquido: stock.patrimonioLiquido || null,

      ativos: stock.ativos || null,

      ativoCirculante: stock.ativoCirculante || null,

      dividaBruta: stock.dividaBruta || null,

      disponibilidade: stock.disponibilidade || null,
      dividaLiquida: stock.dividaLiquida || null,
      valorDeMercado: stock.valorDeMercado || null,
      valorDeFirma: stock.valorDeFirma || null,
      quantidadeDePapeis: stock.quantidadeDePapeis || null,

      segmentoDeListagem: stock.segmentoDeListagem || null,

      freeFloat: stock.freeFloat || null,

      investidores: stock.investidores || null,

      instituicional: stock.instituicional || null,
      pessoaJuridica: stock.pessoaJuridica || null,
      pessoaFisica: stock.pessoaFisica || null,
      ...intrinsic,
    };

    const ticketDb = await ticketRepository.queryOne({
      name: { $eq: ticket.name },
    });

    if (ticketDb) {
      await ticketRepository.updateOne(ticketDb._id, ticket);
      continue;
    }

    await ticketRepository.insertOne(ticket);
  }

  await connection.close();
}
