import type { WithId, ObjectId } from "mongodb";
import type { Income } from "./income";

export interface Ticket {
  name: string;
  slug: string;
  companyId: ObjectId;
  price: number;
  income: Income;
}

export type TicketWithId = WithId<Ticket>;
