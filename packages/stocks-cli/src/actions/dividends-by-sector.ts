import type { StockFilter, SheetHeaders, StockMapItem } from "src/types";
import { writeSpreadsheet } from "src/utils/spreadsheet";
import { splitAndGroupDividends } from "src/stocks/sectors";
import { loadStocks } from "src/stocks/stocks";
import type { Stock } from "@pibernetwork/stocks-model/src/types";

export async function dividendsBySector(
  filters: StockFilter[],
  range: number
): Promise<void> {
  const stocks: Stock[] = await loadStocks(filters, range);
  const dividends: StockMapItem[] = [];

  for (const stock of stocks) {
    const stockGoal = await calculateStockDividend(stock);

    dividends.push(stockGoal);
  }

  const structuredDividends: StockMapItem[] = splitAndGroupDividends(dividends);

  setSectorSpreadsheet("Sectors", structuredDividends);
}

async function calculateStockDividend(stock: Stock): Promise<StockMapItem> {
  const { ticket, company, segment, sector, subSector, averageDividends } =
    stock;

  const { averageYield, averageValue } = averageDividends;

  return {
    company,
    ticket,
    segment,
    sector,
    subSector,
    averageYield,
    averageValue,
  };
}

async function setSectorSpreadsheet(
  sheetName: string,
  dividendGoals: StockMapItem[]
) {
  const headers: SheetHeaders<keyof StockMapItem>[] = [
    {
      title: "Sector",
      key: "sector",
      numberFormat: null,
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Sub Sector",
      key: "subSector",
      numberFormat: null,
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Segment",
      key: "segment",
      numberFormat: null,
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Company",
      key: "company",
      numberFormat: null,
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Ticket",
      key: "ticket",
      numberFormat: null,
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Average Value",
      key: "averageValue",
      numberFormat: {
        type: "CURRENCY",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Average Yield",
      key: "averageYield",
      numberFormat: {
        type: "PERCENT",
        pattern: "0.00%",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
  ];

  const rows = dividendGoals.map((stock) => {
    const row = headers.reduce((row, header) => {
      const { title, key } = header;

      return {
        ...row,
        [title]: stock[key] || "---",
      };
    }, {});
    return row;
  });

  writeSpreadsheet(sheetName, headers, rows);
}
