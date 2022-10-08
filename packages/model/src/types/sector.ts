import type { WithId } from "mongodb";
import type { PartialIncome } from "./income";

export interface Sector {
  name: string;
  slug: string;
  income: PartialIncome;
}

export type SectorWithId = WithId<Sector>;
