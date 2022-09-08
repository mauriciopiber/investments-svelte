import type { ObjectId, WithId } from "mongodb";

export interface Sector {
  name: string;
  slug: string;
}

export type SectorWithId = WithId<Sector>;

export interface SubSector {
  name: string;
  slug: string;
  sectorId: ObjectId;
}

export type SubSectorWithId = WithId<SubSector>;

export interface Segment {
  name: string;
  slug: string;
  subSectorId: ObjectId;
}

export type SegmentWithId = WithId<Segment>;

export interface Company {
  name: string;
  slug: string;
  sectorId: ObjectId;
  subSectorId: ObjectId;
  segmentId: ObjectId;
}

export type CompanyWithId = WithId<Company>;

export interface Ticket {
  name: string;
  slug: string;
  companyId: ObjectId;
}

export type TicketWithId = WithId<Ticket>;

export interface SectorQuery extends Sector {
  subSectors: SubSectorQuery[];
}

export interface SubSectorQuery extends SubSector {
  segments: SegmentQuery[];
}

export interface SegmentQuery extends Segment {
  companies: CompanyQuery[];
}

export interface CompanyQuery extends Company {
  tickets: Ticket[];
}

export interface TicketQuery extends Ticket {
  company: CompanyQuery;
}
