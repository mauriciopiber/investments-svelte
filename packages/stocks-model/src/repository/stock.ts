import type {
  Collection,
  ObjectId,
  MongoClient,
  Filter,
  WithId,
} from "mongodb";
import type { StockFilter, StockFilterTypes, StockSource } from "./../types";
import { MongoRepository } from "./../abstracts/repository";

export class StockRepository extends MongoRepository<StockSource> {
  collection: Collection<StockSource> | null = null;
  client: MongoClient | null = null;

  collectionName = "stocks";

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

  async queryAggregate(aggregate: any): Promise<any> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Stock Repository");
    }
    return await this.collection
      .aggregate(aggregate)

      .toArray();
  }

  async queryAll(filters: Filter<StockSource>): Promise<WithId<StockSource>[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Stock Repository");
    }
    return await this.collection
      .find(filters)
      .sort({ "income.averageYield": -1 })
      .toArray();
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

  async getFilterRanges() {
    const stockKeys = await this.queryAggregate([
      {
        $unset: [
          "_id",
          "ticket",
          "segment",
          "sector",
          "subSector",
          "url",
          "name",
          "code",
          "dividends",
          "segmentoDeListagem",
          "company",
        ],
      },
      { $project: { arrayofkeyvalue: { $objectToArray: "$$ROOT" } } },
      { $unwind: "$arrayofkeyvalue" },
      { $group: { _id: null, allKeys: { $addToSet: "$arrayofkeyvalue.k" } } },
      { $sort: { allKeys: 1 } },
    ]);

    const stockItem = stockKeys[0];

    // console.log(stockItem);
    const { allKeys } = stockItem as { allKeys: StockFilterTypes[] };

    const filters = [];

    for (const key of allKeys) {
      try {
        const range = await this.getRange(key);

        filters.push({
          key,
          range,
        });
      } catch (e) {
        console.error(e);
      }
    }

    console.log(filters);

    return filters;
  }

  async getRange(key: StockFilterTypes) {
    const orderByMin = await this.queryAggregate([
      {
        $match: {
          pessoaFisica: { $gt: 1000 },
          liquidezMediaDiaria: { $gt: 1000 * 100 },
          patrimonioLiquido: { $ne: null, $gt: 0 },
          currentPrice: { $ne: null, $gt: 0 },
          valorDeFirma: { $ne: null, $gt: 0 },
          valorDeMercado: { $ne: null, $gt: 0 },
          freeFloat: { $ne: null, $gt: 0 },
          [key]: { $ne: null },
        },
      },
      {
        $sort: { [key]: 1 },
      },
      {
        $limit: 1,
      },
    ]);

    const orderByMax = await this.queryAggregate([
      {
        $match: {
          pessoaFisica: { $gt: 1000 },
          liquidezMediaDiaria: { $gt: 1000 * 100 },
          patrimonioLiquido: { $ne: null, $gt: 0 },
          currentPrice: { $ne: null, $gt: 0 },
          valorDeFirma: { $ne: null, $gt: 0 },
          valorDeMercado: { $ne: null, $gt: 0 },
          freeFloat: { $ne: null, $gt: 0 },
        },
      },
      {
        $sort: { [key]: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    const minStock = orderByMin[0];

    const maxStock = orderByMax[0];

    const minValue = minStock[key];
    const maxValue = maxStock[key];

    return {
      min: minValue,
      max: maxValue,
    };
  }

  async close() {
    if (!this.client) {
      return;
    }
    this.client.close();
  }
}
