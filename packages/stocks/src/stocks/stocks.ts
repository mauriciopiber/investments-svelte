import { loadStatusInvestCSV, parseStockPage } from "src/utils/statusinvest";
import type {
  StockFilters,
  PartialStock,
  Stock,
  WalletAsset,
  Wallet,
} from "src/types";
import { loadWallet } from "src/wallet";
import { calculateAverageDividends } from "./dividends";
import { filterStocks } from "./filters";
import log from "./../utils/log";

export async function loadWalletStocks(rangeInYears: number): Promise<Wallet> {
  const walletStocks = loadWallet();
  const statusInvestStocks: PartialStock[] = await loadStatusInvestCSV();
  const walletAssets: WalletAsset[] = [];

  for (const walletStock of walletStocks) {
    const { ticket, ...otherWalletFields } = walletStock;

    const statusInvestStock = statusInvestStocks.find(
      (stock) => stock.ticket === ticket
    );

    if (!statusInvestStock) {
      throw new Error("Unexpected error");
    }

    const enrichedStock: Stock = await enrichStock(
      statusInvestStock,
      rangeInYears
    );

    walletAssets.push({
      ...otherWalletFields,
      stock: enrichedStock,
    });
  }

  return walletAssets;
}

export async function loadStocks(
  filters: StockFilters,
  rangeInYears: number
): Promise<Stock[]> {
  log.writeLog("Stocks - Load CSV");
  const statusInvestStocks: PartialStock[] = await loadStatusInvestCSV();
  log.writeLog("Stocks - Filter");
  const filteredStocks = filterStocks(statusInvestStocks, filters);

  const stocks: Stock[] = [];

  log.writeLog("Stocks - Enrich");
  for (const stock of filteredStocks) {
    log.writeLog(`Stocks - Enrich - ${stock.ticket}`);
    const enrichedStock: Stock = await enrichStock(stock, rangeInYears);
    stocks.push(enrichedStock);
  }
  log.writeLog("Stocks - Done");
  return stocks;
}

async function enrichStock(
  stock: PartialStock,
  rangeInYears: number
): Promise<Stock> {
  const { ticket } = stock;
  const stockPageData = await parseStockPage(ticket);

  const { dividendsList, price } = stockPageData;

  const averageDividends = await calculateAverageDividends(
    dividendsList,
    price,
    rangeInYears
  );

  const enrichedStock: Stock = {
    ...stock,
    ...stockPageData,
    indicators: {
      ...stock.indicators,
      ...stockPageData.indicators,
    },
    averageDividends: averageDividends,
  };
  return enrichedStock;
}
