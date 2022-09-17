import { parseSourceStock, loadStocksFromSource } from "src/utils/statusinvest";
import type { StockSource } from "@pibernetwork/stocks-model/src/types";

import { SourceRepository } from "@pibernetwork/stocks-model/src/repository/source";

export async function syncSource() {
  const emptyStocks: StockSource[] = await loadStocksFromSource();

  const stocks: StockSource[] = [];

  for (const filteredStock of emptyStocks) {
    const sourceStock = await parseSourceStock(filteredStock);

    (Object.keys(sourceStock) as (keyof typeof sourceStock)[]).forEach(
      (objectKey) => {
        const value = sourceStock[objectKey];
        if (
          value === undefined ||
          value === null ||
          typeof value === "string" ||
          typeof value === "object"
        ) {
          return;
        }
        if (isNaN(value)) {
          throw new Error(
            `Ticket ${sourceStock.ticket} key ${objectKey} is NaN`
          );
        }
      }
    );
    stocks.push(sourceStock);
    console.log(`Stock ${sourceStock.ticket}: done`);
  }

  const stockRepository = new SourceRepository(process.env.DATABASE_CONNECTION);

  await stockRepository.insertMany(stocks);

  await stockRepository.close();
}
