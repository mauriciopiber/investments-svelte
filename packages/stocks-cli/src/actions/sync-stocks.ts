import { loadStocks } from "src/utils/statusinvest";
import type { Stock } from "@pibernetwork/stocks-model/src/types";
import type { StockFilters } from "src/types";
import { StockRepository } from "@pibernetwork/stocks-model/src/repository/stock";

export async function syncStocks(filters: StockFilters) {
  const stocks: Stock[] = await loadStocks(filters);

  const stockRepository = new StockRepository(process.env.DATABASE_CONNECTION);

  await stockRepository.insertMany(stocks);

  await stockRepository.close();
}
