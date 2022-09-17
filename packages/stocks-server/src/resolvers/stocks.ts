import { SegmentRepository } from "@pibernetwork/stocks-model/src/repository/segment";
import { SubSectorRepository } from "@pibernetwork/stocks-model/src/repository/sub-sector";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import { CompanyRepository } from "@pibernetwork/stocks-model/src/repository/company";
import { TicketRepository } from "@pibernetwork/stocks-model/src/repository/tickets";
import { PortfolioRepository } from "@pibernetwork/stocks-model/src/repository/portfolio";

import {
  SectorWithId,
  SegmentWithId,
  CompanyWithId,
  TicketWithId,
  SubSectorWithId,
  PortfolioWithId,
  InputFilter,
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
  Query: {
    async search(_: unknown, args: InputFilter) {
      const { input } = args;

      const query = input.reduce((filter, inputFilter) => {
        const { key, range } = inputFilter;
        return {
          ...filter,
          [key]: {
            $gte: range.min,
            $lte: range.max,
          },
        };
      }, {});

      const andQuery = (Object.keys(query) as (keyof typeof query)[]).map(
        (key) => {
          return {
            [key]: query[key],
          };
        }
      );

      const query2 =
        (input.length > 0 && {
          $and: andQuery,
        }) ||
        {};

      console.log(JSON.stringify(query2));

      const tickets: TicketWithId[] = await ticketRepository.queryAll(query2);

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
