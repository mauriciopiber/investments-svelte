import { SegmentRepository } from "@pibernetwork/stocks-model/src/repository/segment";
import { SubSectorRepository } from "@pibernetwork/stocks-model/src/repository/sub-sector";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import { CompanyRepository } from "@pibernetwork/stocks-model/src/repository/company";
import { TicketRepository } from "@pibernetwork/stocks-model/src/repository/tickets";
import { PortfolioRepository } from "@pibernetwork/stocks-model/src/repository/portfolio";
import CurrencyScalar from "../scalars/Currency";
import RateScalar from "../scalars/Rate";

import {
  SectorWithId,
  SegmentWithId,
  CompanyWithId,
  TicketWithId,
  SubSectorWithId,
  PortfolioWithId,
  InputFilter,
  IndicatorGroup,
} from "@pibernetwork/stocks-model/src/types";
import { DataloaderService } from "./../utils/dataloader";
import { ObjectId } from "mongodb";

const segmentRepository = new SegmentRepository(
  process.env.DATABASE_CONNECTION
);
const subSectorRepository = new SubSectorRepository(
  process.env.DATABASE_CONNECTION
);
const sectorRepository = new SectorRepository(process.env.DATABASE_CONNECTION);
const companyRepository = new CompanyRepository(
  process.env.DATABASE_CONNECTION
);
const ticketRepository = new TicketRepository(process.env.DATABASE_CONNECTION);
const portfolioRepository = new PortfolioRepository(
  process.env.DATABASE_CONNECTION
);

const dataLoaders = new DataloaderService(
  companyRepository,
  sectorRepository,
  subSectorRepository,
  segmentRepository,
  ticketRepository,
  portfolioRepository
);

const {
  companiesLoader,
  sectorsLoader,
  segmentsLoader,
  subSectorsLoader,
  ticketsLoader,
} = dataLoaders.getLoaders();

export default {
  Currency: CurrencyScalar,
  Rate: RateScalar,
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
    async sector(_: unknown, args: { slug: string }) {
      return await sectorRepository.queryOne({ slug: { $eq: args.slug } });
    },
    async sectors() {
      const sectors = await sectorRepository.queryAll({});

      return sectors;
    },
    async filters() {
      return await ticketRepository.getFilterRanges();
    },
    async subSector(_: unknown, args: { slug: string }) {
      return await subSectorRepository.queryOne({ slug: { $eq: args.slug } });
    },
    async subSectors() {
      return await subSectorRepository.queryAll({});
    },
    async segment(_: unknown, args: { slug: string }) {
      return await segmentRepository.queryOne({ slug: { $eq: args.slug } });
    },
    async segments() {
      return await segmentRepository.queryAll({});
    },
    async company(_: unknown, args: { slug: string }) {
      return await companyRepository.queryOne({ slug: { $eq: args.slug } });
    },
    async companies() {
      return await companyRepository.queryAll({});
    },
    async ticket(_: unknown, args: { slug: string }) {
      return await ticketRepository.queryOne({ slug: { $eq: args.slug } });
    },
    async tickets() {
      return await ticketRepository.queryAll({});
    },
    async portfolios() {
      return await portfolioRepository.queryAll({});
    },
    async portfolio(_: unknown, args: { _id: ObjectId }) {
      return await portfolioRepository.queryOne({ _id: { $eq: args._id } });
    },
  },
  Sector: {
    async subSectors(parent: SectorWithId) {
      const subSectors = await subSectorRepository.queryAll({
        sectorId: { $eq: parent._id },
      });

      return subSectors;
    },
  },
  SubSector: {
    async sector(parent: CompanyWithId) {
      return sectorsLoader.load(parent.sectorId);
    },
    async segments(parent: SubSectorWithId) {
      const segments = await segmentRepository.queryAll({
        subSectorId: { $eq: parent._id },
      });

      return segments;
    },
  },
  Segment: {
    async companies(parent: SegmentWithId) {
      const companies = await companyRepository.queryAll({
        segmentId: { $eq: parent._id },
      });
      return companies;
    },
    async subSector(parent: SegmentWithId) {
      return subSectorsLoader.load(parent.subSectorId);
    },
  },
  Company: {
    async tickets(parent: CompanyWithId) {
      const tickets = await ticketRepository.queryAll({
        companyId: { $eq: parent._id },
      });
      return tickets;
    },
    async segment(parent: CompanyWithId) {
      return segmentsLoader.load(parent.segmentId);
    },
    async sector(parent: CompanyWithId) {
      return sectorsLoader.load(parent.sectorId);
    },
    async subSector(parent: CompanyWithId) {
      return subSectorsLoader.load(parent.subSectorId);
    },
  },
  Ticket: {
    async company(parent: TicketWithId) {
      return companiesLoader.load(parent.companyId);
    },
  },
  Portfolio: {
    async ticket(parent: PortfolioWithId) {
      return ticketsLoader.load(parent.ticketId);
    },
  },
};
