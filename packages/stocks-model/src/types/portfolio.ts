import type { WithId, ObjectId } from "mongodb";

export interface Portfolio {
  ticketId: ObjectId;
  current: number;
  objective: number;
  averagePrice: number;
  // // intrinsic
  // intrinsicValue: number;
  // intrinsicRate: number;
  // // liquidation
  // liquidationValue: number;
  // liquidationRate: number;
}
export type PortfolioWithId = WithId<Portfolio>;
