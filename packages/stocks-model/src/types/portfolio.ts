import type { WithId, ObjectId } from "mongodb";

export interface Portfolio {
  ticketId: ObjectId;
  current: number;
  objective: number;
  averagePrice: number;
}
export type PortfolioWithId = WithId<Portfolio>;
