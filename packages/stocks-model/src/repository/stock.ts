import type { Collection, ObjectId, MongoClient, Filter } from "mongodb";
import type { Stock, StockWithId } from "./../types";
import { MongoRepository } from "./../abstracts/repository";

export class StockRepository extends MongoRepository<Stock> {
  collection: Collection<Stock> | null = null;
  client: MongoClient | null = null;

  collectionName = "stocks";

  async insertMany(sectors: Stock[]) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Stock Repository");
    }
    await this.collection.insertMany(sectors);
  }

  async updateOne(_id: ObjectId, values: Partial<Stock>) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }

    await this.collection.updateOne({ _id }, { $set: values });
  }

  async queryAll(filters: Filter<Stock>): Promise<StockWithId[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Stock Repository");
    }
    return await this.collection
      .find(filters)
      .sort({ "income.averageYield": -1 })
      .toArray();
  }

  async queryOne(filters: Filter<Stock>): Promise<StockWithId | null> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Stock Repository");
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
