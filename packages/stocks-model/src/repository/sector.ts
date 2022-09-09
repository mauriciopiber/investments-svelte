import type { Collection, ObjectId, MongoClient, Filter } from "mongodb";
import mongoDbConnection from "../utils/mongoDbConnection";
import type { Sector, SectorWithId } from "./../types";

export class SectorRepository {
  collection: Collection<Sector> | null = null;
  client: MongoClient | null = null;

  async init() {
    if (!this.collection) {
      const { getInstance } = mongoDbConnection;
      this.client = await getInstance();
      const db = this.client.db("investments");
      const collection = db.collection<Sector>("sectors");
      this.collection = collection;
    }
  }

  async insertMany(sectors: Sector[]) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Sector Repository");
    }
    await this.collection.insertMany(sectors);
  }

  async updateOne(_id: ObjectId, values: Partial<Sector>) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }

    await this.collection.updateOne({ _id }, { $set: values });
  }

  async queryAll(filters: Filter<Sector>): Promise<SectorWithId[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Sector Repository");
    }
    return await this.collection
      .find(filters)
      .sort({ "income.averageYield": -1 })
      .toArray();
  }

  async queryOne(filters: Filter<Sector>): Promise<SectorWithId | null> {
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
