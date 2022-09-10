import type {
  Collection,
  WithId,
  MongoClient,
  Filter,
  ObjectId,
} from "mongodb";
import type { Company, CompanyWithId } from "../types";

import { MongoRepository } from "./../abstracts/repository";

export class CompanyRepository extends MongoRepository<Company> {
  collection: Collection<Company> | null = null;
  client: MongoClient | null = null;

  collectionName = "companies";

  async insertMany(companies: Company[]) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }
    await this.collection.insertMany(companies);
  }

  async insertOne(company: Company) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }
    await this.collection.insertOne(company);
  }

  async updateOne(_id: ObjectId, values: Partial<Company>) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }

    await this.collection.updateOne({ _id }, { $set: values });
  }

  async queryAllByIds(ids: readonly ObjectId[]): Promise<CompanyWithId[]> {
    console.log("company - query by ids", ids);
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

  async queryAll(filters: Filter<Company>): Promise<CompanyWithId[]> {
    console.log("company - query all", filters);
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }
    return await this.collection
      .find(filters)
      .sort({ "income.averageYield": -1 })
      .toArray();
  }

  async queryOne(filters: Filter<Company>): Promise<WithId<Company> | null> {
    console.log("company - query one", filters);
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
