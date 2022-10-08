import type { WithId, ObjectId } from "mongodb";
import type { PartialIncome } from "./income";

export interface Company {
  company: string;
  name: string;
  code: string;
  slug: string;
  sectorId: ObjectId;
  subSectorId: ObjectId;
  segmentId: ObjectId;
  income: PartialIncome;
}

export type CompanyWithId = WithId<Company>;
