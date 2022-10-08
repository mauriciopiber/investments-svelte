import type {
  Collection,
  ObjectId,
  MongoClient,
  Filter,
  WithId,
} from "mongodb";
import type { Repository, StockSource, StockSourceWithId } from "../types";
import { MongoRepository } from "../abstracts/repository";

export class SourceRepository
  extends MongoRepository<StockSource>
  implements Repository<StockSource>
{
  collection: Collection<StockSource> | null = null;
  client: MongoClient | null = null;

  collectionName = "stocks";

  async insertOne(stockSource: StockSource) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Segment Repository");
    }
    await this.collection.insertOne(stockSource);
  }

  async queryAllByIds(ids: readonly ObjectId[]): Promise<StockSourceWithId[]> {
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

  async insertMany(sectors: StockSource[]) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Stock Repository");
    }
    await this.collection.insertMany(sectors);
  }

  async updateOne(_id: ObjectId, values: Partial<StockSource>) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }

    await this.collection.updateOne({ _id }, { $set: values });
  }

  async queryAll(filters: Filter<StockSource>): Promise<WithId<StockSource>[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Stock Repository");
    }
    return await this.collection.find(filters).toArray();
  }

  async queryOne(
    filters: Filter<StockSource>
  ): Promise<WithId<StockSource> | null> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Stock Repository");
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
