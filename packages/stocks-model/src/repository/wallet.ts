import type { Collection, MongoClient, Filter } from "mongodb";
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
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Ticket Repository");
    }
    return await this.collection
      .find(filters)

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
