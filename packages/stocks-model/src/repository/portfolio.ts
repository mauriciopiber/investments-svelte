import type { Collection, MongoClient, Filter } from "mongodb";
import type { Portfolio, PortfolioWithId } from "../types";
import { MongoRepository } from "../abstracts/repository";

export class PortfolioRepository extends MongoRepository<Portfolio> {
  collection: Collection<Portfolio> | null = null;
  client: MongoClient | null = null;
  collectionName = "portfolios";

  async insertMany(segments: Portfolio[]) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Portfolio Repository");
    }
    await this.collection.insertMany(segments);
  }

  async queryAll(filters: Filter<Portfolio>): Promise<PortfolioWithId[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Portfolio Repository");
    }
    return await this.collection
      .find(filters)

      .toArray();
  }

  async queryOne(filters: Filter<Portfolio>): Promise<PortfolioWithId | null> {
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
