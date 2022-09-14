import type { Sector } from "./sector";
import type { SubSector } from "./sub-sector";
import type { Segment } from "./segment";
import type { Company } from "./company";
import type { Ticket } from "./ticket";

export interface SectorQuery extends Sector {
  subSectors: SubSectorQuery[];
}

export interface SubSectorQuery extends SubSector {
  segments: SegmentQuery[];
  sector: SectorQuery;
}

export interface SegmentQuery extends Segment {
  companies: CompanyQuery[];
  subSector: SubSectorQuery;
}

export interface CompanyQuery extends Company {
  tickets: TicketQuery[];
  segment: SegmentQuery;
  subSector: SubSectorQuery;
  sector: SectorQuery;
}

export interface TicketQuery extends Ticket {
  company: CompanyQuery;
}
