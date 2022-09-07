import { Stock } from "@global/types";
import mongoDbConnection from "../utils/mongoDbConnection";

export async function getCollection() {
  const { getInstance } = mongoDbConnection;
  const client = await getInstance();
  const db = client.db("investments");
  const collection = db.collection<Stock>("stocks");
  return collection;
}

export async function getStocks(): Promise<Stock[]> {
  const collection = await getCollection();

  const storedStocks = await collection.find({}).toArray();

  const stocks = storedStocks.map((stock) => ({ ...stock, _id: null }));
  return stocks;
}

export default {
  Query: {
    async stocks() {
      return await getStocks();
    },

    stock() {
      return null;
    },
  },
};
