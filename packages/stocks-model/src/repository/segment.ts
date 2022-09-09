import type {
  Collection,
  WithId,
  MongoClient,
  Filter,
  ObjectId,
} from "mongodb";
import type { SegmentWithId, Segment } from "../types";
import mongoDbConnection from "../utils/mongoDbConnection";

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

  async updateOne(_id: ObjectId, values: Partial<Segment>) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }

    await this.collection.updateOne({ _id }, { $set: values });
  }

  async queryAll(filters: Filter<Segment>): Promise<SegmentWithId[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Segment Repository");
    }
    return await this.collection
      .find(filters)
      .sort({ "income.averageYield": -1 })
      .toArray();
  }

  async queryOne(filters: Filter<Segment>): Promise<SegmentWithId | null> {
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
