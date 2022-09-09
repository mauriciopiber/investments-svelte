import type { Collection, MongoClient, Filter } from "mongodb";
import mongoDbConnection from "../utils/mongoDbConnection";
import type { Ticket, TicketWithId } from "./../types";

export class TicketRepository {
  collection: Collection<Ticket> | null = null;
  client: MongoClient | null = null;

  async init() {
    if (!this.collection) {
      const { getInstance } = mongoDbConnection;
      this.client = await getInstance();
      const db = this.client.db("investments");
      const collection = db.collection<Ticket>("tickets");
      this.collection = collection;
    }
  }

  async insertMany(segments: Ticket[]) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Ticket Repository");
    }
    await this.collection.insertMany(segments);
  }

  async queryAll(filters: Filter<Ticket>): Promise<TicketWithId[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Ticket Repository");
    }
    return await this.collection
      .find(filters)
      .sort({ "income.range.averageYield": -1 })
      .toArray();
  }

  async queryOne(filters: Filter<Ticket>): Promise<TicketWithId | null> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Sector Repository");
    }
    return await this.collection.findOne(filters);
  }

  async close() {
    if (!this.client) {
      return;
    }
    this.client.close();
  }
}
