import {
  sectorRepository,
  segmentRepository,
  subSectorRepository,
  companyRepository,
  portfolioRepository,
  ticketRepository,
} from "@pibernetwork/stocks-model/src/containers/root";

import {
  SectorWithId,
  SegmentWithId,
  CompanyWithId,
  TicketWithId,
  SubSectorWithId,
} from "@pibernetwork/stocks-model/src/types";
import { DataloaderService } from "./../utils/dataloader";
import { ObjectId } from "mongodb";

const dataLoaders = new DataloaderService(
  companyRepository,
  sectorRepository,
  subSectorRepository,
  segmentRepository,
  ticketRepository,
  portfolioRepository
);

const { companiesLoader, sectorsLoader, segmentsLoader, subSectorsLoader } =
  dataLoaders.getLoaders();

export default {
  Query: {
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
};
