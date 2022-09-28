import {
  sectorRepository,
  segmentRepository,
  subSectorRepository,
  companyRepository,
  portfolioRepository,
  ticketRepository,
  ticketService,
} from "@pibernetwork/stocks-model/src/containers/root";

import {
  CompanyWithId,
  TicketWithId,
  PortfolioWithId,
  InputFilter,
  IndicatorGroup,
} from "@pibernetwork/stocks-model/src/types";
import { DataloaderService } from "./../utils/dataloader";
import { DataSource, Query, QueryInput } from "src/types";

const dataLoaders = new DataloaderService(
  companyRepository,
  sectorRepository,
  subSectorRepository,
  segmentRepository,
  ticketRepository,
  portfolioRepository
);

const { ticketsLoader } = dataLoaders.getLoaders();

export default {
  Query: {
    async indicatorsGroups() {
      const indicators: IndicatorGroup[] = [
        {
          name: "Price",
          indicators: [
            {
              key: "currentPrice",
              label: "Current Price",
            },
            {
              key: "minMonth",
              label: "Min Month",
            },
            {
              key: "maxMonth",
              label: "Max Month",
            },
            {
              key: "minYear",
              label: "Min Year",
            },
            {
              key: "maxYear",
              label: "Max Year",
            },
          ],
        },
        {
          name: "Ticket",
          indicators: [
            {
              key: "tagAlong",
              label: "Tag Along",
            },
            {
              key: "liquidezMediaDiaria",
              label: "Liquidez média diária",
            },
            {
              key: "participacaoIbov",
              label: "Participação IBOV",
            },
            {
              key: "quantidadeDePapeis",
              label: "N° Papeis",
            },
            {
              key: "segmentoDeListagem",
              label: "Segmento de Listagem",
            },
            {
              key: "freeFloat",
              label: "Free Float",
            },
            {
              key: "investidores",
              label: "Investidores",
            },
            {
              key: "instituicional",
              label: "Institucional",
            },
            {
              key: "pessoaFisica",
              label: "Pessoa Física",
            },
            {
              key: "pessoaJuridica",
              label: "Pessoa Jurídica",
            },
          ],
        },
        {
          name: "Valuation",
          indicators: [
            {
              key: "dividendsYield",
              label: "D/Y",
            },
            {
              key: "precoAtualPorLucroPorAcao",
              label: "P/L",
            },
            {
              key: "pegRatio",
              label: "PEG RATIO",
            },
            {
              key: "precoAtualPorValorPatrimonialPorAcao",
              label: "P/VP",
            },
            {
              label: "EV/EBITDA",
              key: "valorDeFirmaPorEBITDA",
            },
            {
              label: "EV/EBIT",
              key: "valorDeFirmaPorEBIT",
            },
            {
              label: "P/EBITDA",
              key: "precoAtualPorEBITDA",
            },
            {
              label: "P/EBIT",
              key: "precoAtualPorEBIT",
            },
            {
              label: "VPA",
              key: "patrimonioLiquidoPorNumeroDeAcoes",
            },
            {
              label: "P/ATIVO",
              key: "precoAtualPorAtivos",
            },
            {
              label: "LPA",
              key: "lucroLiquidoPorNumeroDeAcoes",
            },
            {
              label: "P/SR",
              key: "precoAtualPorReceitaLiquidaPorAcao",
            },
            {
              label: "P/CAP.GIRO",
              key: "precoAtualPorAtivoCirculanteMenosPassivoCirculante",
            },
            {
              label: "P/ATIVO CIRC. LIQ.",
              key: "precoAtualPorAtivosCirculanesLiquidosPorAcao",
            },
          ],
        },
        {
          name: "Debts",
          indicators: [
            {
              key: "dividaLiquidaPorPatrimonioLiquido",
              label: "Dívida Líquida/PL",
            },
            {
              key: "dividaLiquidaPorEBITDA",
              label: "Dívida Líquida/EBITDA",
            },
            {
              key: "dividaLiquidaPorEBIT",
              label: "Dívida Líquida/EBIT",
            },
            {
              key: "patrimonioLiquidoPorAtivos",
              label: "PL/Ativos",
            },
            {
              key: "passivosPorAtivos",
              label: "Passivos/Ativos",
            },
            {
              key: "ativoCirculantePorPassivoCirculante",
              label: "Liquidez Corrente",
            },
          ],
        },
        {
          name: "Efficience",
          indicators: [
            {
              key: "lucroBrutoPorReceitaLiquida",
              label: "Margem Bruta",
            },
            {
              key: "EBITDAPorReceitaLiquida",
              label: "Margem EBITDA",
            },
            {
              key: "EBITPorReceitaLiquida",
              label: "Margem EBIT",
            },
            {
              key: "lucroLiquidoPorReceitaLiquida",
              label: "Margem Líquida",
            },
          ],
        },
        {
          name: "Rentability",
          indicators: [
            {
              key: "lucroLiquidoPorPatrimonioLiquido",
              label: "ROE",
            },

            {
              key: "lucroLiquidoPorAtivoTotal",
              label: "ROA",
            },
            {
              key: "ebitMenosImpostosPorPatrimonioLiquidoMaisEndividamento",
              label: "ROIC",
            },
            {
              key: "receitaLiquidaPorTotalMedioDeAtivos",
              label: "GIRO ATIVOS",
            },
          ],
        },
        {
          name: "Grow",
          indicators: [
            {
              key: "compoundAnnualGrowthRateLucro5Anos",
              label: "CARG Lucros 5 anos",
            },
            {
              key: "compoundAnnualGrowthRateReceita5Anos",
              label: "CARG Receita 5 anos",
            },
          ],
        },
        {
          name: "Company",
          indicators: [
            {
              key: "patrimonioLiquido",
              label: "Patrimônio Líquido",
            },
            {
              key: "ativos",
              label: "Ativos",
            },
            {
              key: "ativoCirculante",
              label: "Ativo Circulante",
            },
            {
              key: "dividaBruta",
              label: "Dívida Bruta",
            },
            {
              key: "disponibilidade",
              label: "Disponibilidade",
            },
            {
              key: "dividaLiquida",
              label: "Dívida Líquida",
            },
            {
              key: "valorDeMercado",
              label: "Valor de Mercado",
            },
            {
              key: "valorDeFirma",
              label: "Valor de Firma",
            },
          ],
        },
      ];

      return indicators;
    },
    async search(_: unknown, args: InputFilter) {
      const { input } = args;

      const queryKeys = input.map((filter) => {
        const { key, range } = filter;
        const { min, max, nullable } = range;

        const clauses = [];

        clauses.push({ [key]: { $gte: min, $lte: max } });
        if (nullable) {
          clauses.push({ [key]: { $eq: null } });
        }

        return {
          $or: clauses,
        };
      });

      const query =
        (queryKeys.length > 0 && {
          $and: queryKeys,
        }) ||
        {};
      const tickets: TicketWithId[] = await ticketRepository.queryAll(query);

      const count = tickets.length;

      return {
        count,
        tickets,
      };
    },

    async ticket(_: unknown, args: { slug: string }) {
      return await ticketRepository.queryOne({ slug: { $eq: args.slug } });
    },
    async tickets(
      _: unknown,
      { input: { page, sort } }: Query,
      { dataSources: { tickets } }: { dataSources: DataSource }
    ) {
      return await ticketService.queryAll(page, sort);
    },
  },

  Company: {
    async tickets(parent: CompanyWithId) {
      const tickets = await ticketRepository.queryAll({
        companyId: { $eq: parent._id },
      });
      return tickets;
    },
  },

  Portfolio: {
    async ticket(parent: PortfolioWithId) {
      return ticketsLoader.load(parent.ticketId);
    },
  },
};
