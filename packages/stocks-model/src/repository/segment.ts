import type { Collection, MongoClient, Filter, ObjectId } from "mongodb";
import type { SegmentWithId, Segment } from "../types";
import { MongoRepository } from "./../abstracts/repository";

export class SegmentRepository extends MongoRepository<Segment> {
  collection: Collection<Segment> | null = null;
  client: MongoClient | null = null;
  collectionName = "segments";

  async insertOne(segment: Segment) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Segment Repository");
    }
    await this.collection.insertOne(segment);
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

  async queryAllByIds(ids: readonly ObjectId[]): Promise<SegmentWithId[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }
    return await this.collection
      .find({
        _id: { $in: ids },
      })
      .sort({ "income.averageYield": -1 })
      .toArray();
  }

  async close() {
    if (!this.client) {
      return;
    }
    this.client.close();
  }
}
