import { Stock } from "@global/types";
import mongoDbConnection from "../utils/mongoDbConnection";
import { SegmentRepository } from "@pibernetwork/stocks-model/src/repository/segment";
import { SubSectorRepository } from "@pibernetwork/stocks-model/src/repository/sub-sector";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import { CompanyRepository } from "@pibernetwork/stocks-model/src/repository/company";
import { TicketRepository } from "@pibernetwork/stocks-model/src/repository/tickets";
import {
  SectorWithId,
  SegmentWithId,
  CompanyWithId,
  TicketWithId,
} from "@pibernetwork/stocks-model/src/types";

const segmentRepository = new SegmentRepository();
const subSectorRepository = new SubSectorRepository();
const sectorRepository = new SectorRepository();
const companyRepository = new CompanyRepository();
const ticketRepository = new TicketRepository();

export default {
  Query: {
    async sector(_: unknown, args: { slug: string }) {
      return await sectorRepository.queryOne({ slug: { $eq: args.slug } });
    },
    async sectors() {
      return await sectorRepository.queryAll({});
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
  },
  Sector: {
    async subSectors(parent: SectorWithId) {
      const subSectors = await subSectorRepository.queryAll({
        sectorId: { $eq: parent._id },
      });
      console.log(subSectors);
      return subSectors;
    },
  },
  SubSector: {
    async segments(parent: SegmentWithId) {
      const segments = await segmentRepository.queryAll({
        subSectorId: { $eq: parent._id },
      });

      return segments;
    },
  },
  Segment: {
    async companies(parent: CompanyWithId) {
      const companies = await companyRepository.queryAll({
        segmentId: { $eq: parent._id },
      });
      return companies;
    },
  },
  Company: {
    async tickets(parent: TicketWithId) {
      const tickets = await ticketRepository.queryAll({
        companyId: { $eq: parent._id },
      });
      return tickets;
    },
  },
};
