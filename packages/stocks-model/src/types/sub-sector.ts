import type { WithId, ObjectId } from "mongodb";
import type { PartialIncome } from "./income";

export interface SubSector {
  name: string;
  slug: string;
  sectorId: ObjectId;
  income: PartialIncome;
}

export type SubSectorWithId = WithId<SubSector>;
