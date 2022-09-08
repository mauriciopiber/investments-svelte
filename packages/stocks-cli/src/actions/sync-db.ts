import type { Collection } from "mongodb";
import { loadStocks } from "src/stocks/stocks";
import type { Stock } from "@global/types";
import mongoDbConnection from "../utils/mongoDbConnection";

export async function syncDb() {
  const { getInstance } = mongoDbConnection;
  const client = await getInstance();
  const db = client.db("investments");
  const collection = db.collection<Stock>("stocks");

  await collection.deleteMany({});

  const stocks: Stock[] = await loadStocks([], 5);

  await addStocks(collection, stocks);

  await client.close();
}

async function addStocks(collection: Collection<Stock>, stock: Stock[]) {
  await collection.insertMany(stock);
}
