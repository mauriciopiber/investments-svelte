import type { Collection, WithId, MongoClient, Filter } from "mongodb";
import mongoDbConnection from "../utils/mongoDbConnection";
import type { SubSector } from "./../types";

export class SubSectorRepository {
  collection: Collection<SubSector> | null = null;
  client: MongoClient | null = null;

  async init() {
    if (!this.collection) {
      const { getInstance } = mongoDbConnection;
      this.client = await getInstance();
      const db = this.client.db("investments");
      const collection = db.collection<SubSector>("subsectors");
      this.collection = collection;
    }
  }

  async insertMany(SubSector: SubSector[]) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Sub-sector Repository");
    }
    await this.collection.insertMany(SubSector);
  }

  async queryAll(filters: Filter<SubSector>): Promise<SubSector[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Sub Sector Repository");
    }
    return await this.collection.find(filters).toArray();
  }

  async queryOne(
    filters: Filter<SubSector>
  ): Promise<WithId<SubSector> | null> {
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
