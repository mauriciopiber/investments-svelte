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
  SubSectorWithId,
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
      const sectors = await sectorRepository.queryAll({});

      return sectors;
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
    async companies(
      _: unknown,
      {
        limit,
        offset,
        sort,
      }: { limit: number; offset: number; sort: { key: string; order: number } }
    ) {
      const { key, order } = sort;
      console.log(limit, offset, key, order);
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

      return subSectors;
    },
  },
  SubSector: {
    async sector(parent: SubSectorWithId) {
      const sector = await sectorRepository.queryOne({
        _id: { $eq: parent.sectorId },
      });

      return sector;
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
      const sector = await subSectorRepository.queryOne({
        _id: { $eq: parent.subSectorId },
      });

      return sector;
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
      const segment = await segmentRepository.queryOne({
        _id: { $eq: parent.segmentId },
      });

      return segment;
    },
    async sector(parent: CompanyWithId) {
      const sector = await sectorRepository.queryOne({
        _id: { $eq: parent.sectorId },
      });
      return sector;
    },
    async subSector(parent: CompanyWithId) {
      const subSector = await subSectorRepository.queryOne({
        _id: { $eq: parent.subSectorId },
      });
      return subSector;
    },
  },
  Ticket: {
    async company(parent: TicketWithId) {
      const company = await companyRepository.queryOne({
        _id: { $eq: parent.companyId },
      });

      return company;
    },
  },
};
