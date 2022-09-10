import type { Collection, MongoClient, Filter, ObjectId } from "mongodb";
import type { Ticket, TicketWithId } from "./../types";
import { MongoRepository } from "./../abstracts/repository";

export class TicketRepository extends MongoRepository<Ticket> {
  collection: Collection<Ticket> | null = null;
  client: MongoClient | null = null;
  collectionName = "tickets";

  async insertMany(segments: Ticket[]) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Ticket Repository");
    }
    await this.collection.insertMany(segments);
  }

  async queryAll(filters: Filter<Ticket>): Promise<TicketWithId[]> {
    console.log("tickets - query all", filters);
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
    console.log("tickets - query one", filters);
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Sector Repository");
    }
    return await this.collection.findOne(filters);
  }

  async queryAllByIds(ids: readonly ObjectId[]): Promise<TicketWithId[]> {
    console.log(`${this.collectionName} - query by ids`, ids.length);
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }
    return await this.collection
      .find({
        _id: { $in: ids },
      })
      .sort({ "income.averageYield": -1 })
      .toArray();
  }

  async close() {
    if (!this.client) {
      return;
    }
    this.client.close();
  }
}
