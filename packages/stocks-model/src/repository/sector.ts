import type { Collection, WithId, MongoClient } from "mongodb";
import mongoDbConnection from "../utils/mongoDbConnection";

interface Sector {
  name: string;
  slug: string;
}

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

  async insertMany(companies: Sector[]) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Sector Repository");
    }
    await this.collection.insertMany(companies);
  }

  async close() {
    if (!this.client) {
      return;
    }
    this.client.close();
  }
}
