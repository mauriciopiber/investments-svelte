import { writeSpreadsheet } from "src/utils/spreadsheet";
import type { GoalReport, StockFilter, SheetHeaders, Stock } from "src/types";
import { loadStocks } from "src/stocks/stocks";

export async function dividendsByGoal(
  filters: StockFilter[],
  range: number,
  target: number
): Promise<void> {
  const stocks: Stock[] = await loadStocks(filters, range);

  const dividendGoals: GoalReport[] = [];

  for (const stock of stocks) {
    const stockGoal = await calculateStockDividendGoal(stock, target);

    dividendGoals.push(stockGoal);
  }

  setGoalSpreadsheet("Goal", dividendGoals);
}

async function calculateStockDividendGoal(
  stock: Stock,
  monthlyDividends: number
): Promise<GoalReport> {
  const { ticket, sector, subSector, segment, price, averageDividends } = stock;

  const { averageValue, averageYield } = averageDividends;

  const yearlyDividends = monthlyDividends * 12;

  const requiredTickets = averageValue > 0 ? yearlyDividends / averageValue : 0;

  const requiredInvestment = requiredTickets > 0 ? requiredTickets * price : 0;

  const dividendsYield = averageYield / 100;

  return {
    ticket,
    segment: segment,
    sector: sector,
    subSector: subSector,
    averageDividends: averageValue,
    requiredTickets: parseInt(requiredTickets.toString()),
    currentPrice: price,
    requiredInvestment: requiredInvestment,
    dividendsYield: dividendsYield,
  };
}

async function setGoalSpreadsheet(
  sheetName: string,
  dividendGoals: GoalReport[]
) {
  const headers: SheetHeaders<keyof GoalReport>[] = [
    {
      title: "Stock",
      key: "ticket",
      numberFormat: null,
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
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
      title: "Current Price",
      key: "currentPrice",
      numberFormat: {
        type: "CURRENCY",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Required Tickets",

      key: "requiredTickets",
      numberFormat: {
        type: "NUMBER",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Average D.",
      key: "averageDividends",
      numberFormat: {
        type: "CURRENCY",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Yield D.",
      key: "dividendsYield",
      numberFormat: {
        type: "PERCENT",
        pattern: "0.00%",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Required",
      key: "requiredInvestment",
      numberFormat: {
        type: "CURRENCY",
        pattern: "",
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
        [title]: stock[key],
      };
    }, {});
    return row;
  });

  writeSpreadsheet(sheetName, headers, rows);
}
