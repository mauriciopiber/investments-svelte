import { parseSourceStock, loadStocksFromSource } from "src/utils/statusinvest";
import type { Stock, StockSource } from "@pibernetwork/stocks-model/src/types";
import type { StockFilters } from "src/types";
import { StockRepository } from "@pibernetwork/stocks-model/src/repository/stock";

export async function syncStocks(filters: StockFilters) {
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

  const stockRepository = new StockRepository(process.env.DATABASE_CONNECTION);

  await stockRepository.insertMany(stocks);

  await stockRepository.close();
}
