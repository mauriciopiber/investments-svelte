import type { WithId, ObjectId } from "mongodb";
import type { PartialIncome } from "./income";

export interface Segment {
  name: string;
  slug: string;
  subSectorId: ObjectId;
  income: PartialIncome;
}

export type SegmentWithId = WithId<Segment>;
