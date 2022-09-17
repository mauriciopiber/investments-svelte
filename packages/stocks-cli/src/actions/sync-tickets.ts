import { CompanyRepository } from "@pibernetwork/stocks-model/src/repository/company";
import { TicketRepository } from "@pibernetwork/stocks-model/src/repository/tickets";
import { SourceRepository } from "@pibernetwork/stocks-model/src/repository/source";
import type {
  Ticket,
  Income,
  StockSourceWithId,
} from "@pibernetwork/stocks-model/src/types";
import slug from "slug";
import { calculateDividendsV2 } from "src/stocks/dividends";
import dotenv from "dotenv";
dotenv.config();

const stockRepository = new SourceRepository(process.env.DATABASE_CONNECTION);
const companyRepository = new CompanyRepository(
  process.env.DATABASE_CONNECTION
);
const ticketRepository = new TicketRepository(process.env.DATABASE_CONNECTION);

export async function syncTickets(rangeInYears: number) {
  const stocks: StockSourceWithId[] = await stockRepository.queryAll({});

  const ticketModels: Ticket[] = [];

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

    const income: Income = calculateDividendsV2(
      stock.dividends,
      stock.currentPrice,
      rangeInYears
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
    };

    ticketModels.push(ticket);
  }

  await ticketRepository.insertMany(ticketModels);

  await ticketRepository.close();
  await companyRepository.close();
}
