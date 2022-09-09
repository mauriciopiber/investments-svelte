import { loadStatusInvestCSV, parseStockPage } from "src/utils/statusinvest";
import type { StockFilters, PartialStock } from "src/types";
import type { Stock } from "@pibernetwork/stocks-model/src/types";
import { filterStocks } from "./filters";
import log from "./../utils/log";

export async function loadStocks(): Promise<Stock[]> {
  return [];
}

export async function loadWalletStocks(rangeInYears: number): Promise<void> {
  console.log("to delete");
  // const walletStocks = loadWallet();
  // const statusInvestStocks: PartialStock[] = await loadStatusInvestCSV();
  // const walletAssets: WalletAsset[] = [];

  // for (const walletStock of walletStocks) {
  //   const { ticket, ...otherWalletFields } = walletStock;

  //   const statusInvestStock = statusInvestStocks.find(
  //     (stock) => stock.ticket === ticket
  //   );

  //   if (!statusInvestStock) {
  //     throw new Error("Unexpected error");
  //   }

  //   const enrichedStock: Stock = await enrichStock(
  //     statusInvestStock,
  //     rangeInYears
  //   );

  //   walletAssets.push({
  //     ...otherWalletFields,
  //     stock: enrichedStock,
  //   });
  // }

  // return walletAssets;
}

export async function loadStocksV2(filters: StockFilters): Promise<void> {
  console.log("to delete");
}

// async function enrichStockV2(stock: PartialStock): Promise<StockPageData> {
//   const { ticket } = stock;
//   const stockPageData = await parseStockPage(ticket);

//   return stockPageData;
// }
