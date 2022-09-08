import type { Collection, WithId, MongoClient, Filter } from "mongodb";
import mongoDbConnection from "../utils/mongoDbConnection";
import { Company, CompanyWithId } from "../types";

export class CompanyRepository {
  collection: Collection<Company> | null = null;
  client: MongoClient | null = null;

  async init() {
    if (!this.collection) {
      const { getInstance } = mongoDbConnection;
      this.client = await getInstance();
      const db = this.client.db("investments");
      const collection = db.collection<Company>("companies");
      this.collection = collection;
    }
  }

  async insertMany(companies: Company[]) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }
    await this.collection.insertMany(companies);
  }

  async queryAll(filters: Filter<Company>): Promise<CompanyWithId[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }
    return await this.collection.find(filters).toArray();
  }

  async queryOne(filters: Filter<Company>): Promise<WithId<Company> | null> {
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
