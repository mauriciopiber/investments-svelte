import type { Collection, MongoClient, Filter, ObjectId } from "mongodb";
import type { Ticket, TicketFilterTypes, TicketWithId } from "./../types";
import { MongoRepository } from "./../abstracts/repository";

export class TicketRepository extends MongoRepository<Ticket> {
  collection: Collection<Ticket> | null = null;
  client: MongoClient | null = null;
  collectionName = "tickets";

  async insertMany(segments: Ticket[]) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Ticket Repository");
    }
    await this.collection.insertMany(segments);
  }

  async insertOne(ticket: Ticket) {
    await this.init();

    if (!this.collection) {
      throw new Error("Missing connection for Company Repository");
    }
    await this.collection.insertOne(ticket);
  }

  async queryAll(filters: Filter<any>): Promise<TicketWithId[]> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Ticket Repository");
    }
    return await this.collection
      .find(filters)
      .sort({ "income.range.averageYield": -1 })
      .toArray();
  }

  async queryOne(filters: Filter<Ticket>): Promise<TicketWithId | null> {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection for Sector Repository");
    }
    return await this.collection.findOne(filters);
  }

  async queryAllByIds(ids: readonly ObjectId[]): Promise<TicketWithId[]> {
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

  async updateOne(_id: ObjectId, values: Partial<Ticket>) {
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

  async getFilterRanges() {
    const stockKeys = await this.queryAggregate([
      {
        $unset: [
          "_id",
          "ticket",
          "segment",
          "sector",
          "subSector",
          "companyId",
          "slug",
          "url",
          "name",
          "code",
          "dividends",
          "segmentoDeListagem",
          "company",
          "income",
        ],
      },
      { $project: { arrayofkeyvalue: { $objectToArray: "$$ROOT" } } },
      { $unwind: "$arrayofkeyvalue" },
      { $group: { _id: null, allKeys: { $addToSet: "$arrayofkeyvalue.k" } } },
      { $sort: { allKeys: 1 } },
    ]);

    const stockItem = stockKeys[0];

    const { allKeys } = stockItem as { allKeys: TicketFilterTypes[] };

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

    return filters;
  }

  excludeStocks = {
    $match: {
      pessoaFisica: { $gt: 1000 },
      liquidezMediaDiaria: { $gt: 1000 * 100 },
      patrimonioLiquido: { $ne: null, $gt: 0 },
      currentPrice: { $ne: null, $gt: 0 },
      valorDeFirma: { $ne: null, $gt: 0 },
      valorDeMercado: { $ne: null, $gt: 0 },
      freeFloat: { $ne: null, $gt: 0, $lte: 100 },
    },
  };

  async getRange(key: TicketFilterTypes) {
    const orderByMin = await this.queryAggregate([
      // this.excludeStocks,
      {
        $match: {
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
      // this.excludeStocks,
      {
        $match: {
          [key]: { $ne: null },
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
}
