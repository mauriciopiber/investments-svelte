import type { WithId, ObjectId } from "mongodb";

export interface Portfolio {
  ticketId: ObjectId;
  current: number;
  objective: number;
  averagePrice: number;

  liquidationAmount: number;
  liquidationRate: number;
  investmentAmount: number;
  objectiveDividends: number;
  currentDividends: number;
}
export type PortfolioWithId = WithId<Portfolio>;
