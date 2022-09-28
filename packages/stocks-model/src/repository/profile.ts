import type {
  Collection,
  WithId,
  MongoClient,
  Filter,
  ObjectId,
} from "mongodb";
import type { Profile, ProfileWithId, Repository } from "../types";

import { MongoRepository } from "../abstracts/repository";

export class ProfileRepository
  extends MongoRepository<Profile>
  implements Repository<Profile>
{
  collection: Collection<Profile> | null = null;
  client: MongoClient | null = null;

  collectionName = "companies";

  async insertMany(companies: Profile[]) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Profile Repository");
    }
    await this.collection.insertMany(companies);
  }

  async insertOne(company: Profile) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Profile Repository");
    }
    await this.collection.insertOne(company);
  }

  async updateOne(_id: ObjectId, values: Partial<Profile>) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Profile Repository");
    }

    await this.collection.updateOne({ _id }, { $set: values });
  }

  async queryAllByIds(ids: readonly ObjectId[]): Promise<ProfileWithId[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Profile Repository");
    }
    return await this.collection
      .find({
        _id: { $in: ids },
      })
      .sort({ "income.averageYield": -1 })
      .toArray();
  }

  async queryAll(filters: Filter<Profile>): Promise<ProfileWithId[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Profile Repository");
    }
    return await this.collection
      .find(filters)
      .sort({ "income.averageYield": -1 })
      .toArray();
  }

  async queryOne(filters: Filter<Profile>): Promise<WithId<Profile> | null> {
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
