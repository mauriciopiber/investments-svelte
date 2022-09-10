import type { Collection, ObjectId, MongoClient, Filter } from "mongodb";

import type { SubSector, SubSectorWithId } from "./../types";
import { MongoRepository } from "./../abstracts/repository";

export class SubSectorRepository extends MongoRepository<SubSector> {
  collection: Collection<SubSector> | null = null;
  client: MongoClient | null = null;
  collectionName = "subsectors";

  async insertOne(subSector: SubSector) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Sub-sector Repository");
    }
    await this.collection.insertOne(subSector);
  }

  async insertMany(SubSector: SubSector[]) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Sub-sector Repository");
    }
    await this.collection.insertMany(SubSector);
  }

  async updateOne(_id: ObjectId, values: Partial<SubSector>) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }

    await this.collection.updateOne({ _id }, { $set: values });
  }

  async queryAll(filters: Filter<SubSector>): Promise<SubSectorWithId[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Sub Sector Repository");
    }
    return await this.collection
      .find(filters)
      .sort({ "income.averageYield": -1 })
      .toArray();
  }

  async queryOne(filters: Filter<SubSector>): Promise<SubSectorWithId | null> {
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
