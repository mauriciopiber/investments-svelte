import type { Collection, ObjectId, MongoClient, Filter } from "mongodb";
import mongoDbConnection from "../utils/mongoDbConnection";
import type { Stock, StockWithId } from "./../types";

export class StockRepository {
  collection: Collection<Stock> | null = null;
  client: MongoClient | null = null;

  async init() {
    if (!this.collection) {
      const { getInstance } = mongoDbConnection;
      this.client = await getInstance();
      const db = this.client.db("investments");
      const collection = db.collection<Stock>("stocks");
      this.collection = collection;
    }
  }

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
