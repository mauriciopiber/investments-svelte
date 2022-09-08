import type { Collection, WithId, MongoClient, Filter } from "mongodb";
import mongoDbConnection from "../utils/mongoDbConnection";

interface Segment {
  name: string;
  slug: string;
}

export class SegmentRepository {
  collection: Collection<Segment> | null = null;
  client: MongoClient | null = null;

  async init() {
    if (!this.collection) {
      const { getInstance } = mongoDbConnection;
      this.client = await getInstance();
      const db = this.client.db("investments");
      const collection = db.collection<Segment>("segments");
      this.collection = collection;
    }
  }

  async insertMany(segments: Segment[]) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Segment Repository");
    }
    await this.collection.insertMany(segments);
  }

  async queryAll(filters: Filter<Segment>): Promise<Segment[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Segment Repository");
    }
    return await this.collection.find(filters).toArray();
  }

  async queryOne(filters: Filter<Segment>): Promise<WithId<Segment> | null> {
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
