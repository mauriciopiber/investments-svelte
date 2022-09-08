import type { Collection, WithId, MongoClient } from "mongodb";
import mongoDbConnection from "../utils/mongoDbConnection";

interface Company {
  name: string;
  slug: string;
}

type CompanyModel = WithId<Company>;

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

  async queryAll(): Promise<CompanyModel[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }
    return await this.collection.find({}).toArray();
  }

  async close() {
    if (!this.client) {
      return;
    }
    this.client.close();
  }
}
