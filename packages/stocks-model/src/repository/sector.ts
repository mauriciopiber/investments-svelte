import type { Collection, ObjectId, MongoClient, Filter } from "mongodb";
import type { Sector, SectorWithId } from "./../types";

import { MongoRepository } from "./../abstracts/repository";

export class SectorRepository extends MongoRepository<Sector> {
  collection: Collection<Sector> | null = null;
  client: MongoClient | null = null;
  collectionName = "sectors";

  async insertMany(sectors: Sector[]) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Sector Repository");
    }
    await this.collection.insertMany(sectors);
  }

  async insertOne(sector: Sector) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Sector Repository");
    }
    await this.collection.insertOne(sector);
  }

  async updateOne(_id: ObjectId, values: Partial<Sector>) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }

    await this.collection.updateOne({ _id }, { $set: values });
  }

  async queryAllByIds(ids: readonly ObjectId[]): Promise<SectorWithId[]> {
    console.log("sectors - query by ids", ids.length);
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

  async queryAll(filters: Filter<Sector>): Promise<SectorWithId[]> {
    console.log("sectors - query all", filters);
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
    console.log("sectors - query one", filters);
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
