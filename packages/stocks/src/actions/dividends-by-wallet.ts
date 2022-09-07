import { parseRate } from "$utils/parseRate";
import { writeSpreadsheet } from "src/utils/spreadsheet";
import { loadWalletStocks } from "src/stocks/stocks";
import type { SheetHeaders, SheetRow } from "src/types";
import type {
  WalletStockRateReport,
  WalletStockReport,
} from "src/types/commands/wallet";
import type { Wallet, WalletAsset } from "src/types/wallet";

export async function dividendsByWallet(range: number, target: number) {
  const wallet: Wallet = await loadWalletStocks(range);

  const walletReport: WalletStockReport[] = [];

  for (const walletItem of wallet) {
    const walletStockReport = await calculateWalletStock(
      range,
      target,
      walletItem
    );

    walletReport.push(walletStockReport);
  }

  const walletRateReport = calculateWalletRates(walletReport);

  setWalletSpreadsheet("Wallet", walletRateReport);
}

function calculateWalletRates(
  walletReport: WalletStockReport[]
): WalletStockRateReport[] {
  const averageLiquidation =
    walletReport.reduce(
      (average, wallet) => average + wallet.liquidationValue,
      0
    ) / walletReport.length;

  const averageInvestment =
    walletReport.reduce(
      (average, wallet) => average + wallet.investmentRequired,
      0
    ) / walletReport.length;
  return walletReport.map((wallet) => {
    return {
      ...wallet,
      liquidationRate: parseRate(averageLiquidation, wallet.liquidationValue),
      investmentRate: parseRate(averageInvestment, wallet.investmentRequired),
    };
  });
}

async function calculateWalletStock(
  rangeInYears: number,
  objetiveTarget: number,
  walletItem: WalletAsset
): Promise<WalletStockReport> {
  const { stock, custody, target } = walletItem;

  const {
    ticket,
    price,
    averageDividends,
    sector,
    segment,
    subSector,
    indicators,
  } = stock;

  const { lpa, vpa } = indicators;

  const { averageValue, averageYield } = averageDividends;

  const missingCustody = target - custody;

  const investmentRequired = price * missingCustody;

  const currentDividends = custody * averageValue;
  const targetDividendsYear = target * averageValue;

  const liquidationValue = custody * price;

  const objectiveStrategy =
    parseInt((objetiveTarget / averageValue).toString()) + 1;

  const objectiveCustody = objectiveStrategy - custody;

  const objectiveInvestment = objectiveCustody * price;

  const intrinsictValue = Math.sqrt(22.5 * lpa * vpa);

  const diffIntrinsicValue = price - intrinsictValue;
  const rateDiffIntrinsicValue = (diffIntrinsicValue * 100) / price;

  return {
    ticket,
    sector,
    segment,
    subSector,
    custody,
    strategyCustody: target,
    missingCustody: target - custody,
    investmentRequired,
    currentDividends,
    targetDividends: targetDividendsYear,
    averageValue: averageValue,
    averageYield: averageYield / 100,
    objectiveStrategy,
    objectiveValue: objectiveStrategy * averageValue,
    objectiveCustody,
    objectiveInvestment,
    liquidationValue,
    currentValue: price,
    intrinsictValue: intrinsictValue,
    diffIntrinsicValue,
    rateDiffIntrinsicValue: rateDiffIntrinsicValue / 100,
  };
}

function setWalletSpreadsheet(
  sheetName: string,
  wallet: WalletStockRateReport[]
) {
  const headers: SheetHeaders<keyof WalletStockRateReport>[] = [
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
      wrapStrategy: "CLIP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Sub Sector",
      key: "subSector",
      numberFormat: null,
      wrapStrategy: "CLIP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Segment",
      key: "segment",
      numberFormat: null,
      wrapStrategy: "CLIP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Custody",
      key: "custody",
      numberFormat: {
        type: "NUMBER",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 15, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Intrinsict Value",
      key: "intrinsictValue",
      numberFormat: {
        type: "CURRENCY",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Intrinsict Rate",
      key: "rateDiffIntrinsicValue",
      numberFormat: {
        type: "PERCENT",
        pattern: "0.00% ",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Current Value",
      key: "currentValue",
      numberFormat: {
        type: "CURRENCY",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: (row: SheetRow) => {
        if (row["Current Value"] > 50) {
          return { red: 50, green: 50, blue: 1, alpha: 1 };
        }
        return { red: 25, green: 25, blue: 1, alpha: 1 };
      },
    },
    {
      title: "Liquidation Value",
      key: "liquidationValue",
      numberFormat: {
        type: "CURRENCY",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Liquidation Rate",
      key: "liquidationRate",
      numberFormat: {
        type: "PERCENT",
        pattern: "0.00%",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Target Custody",
      key: "strategyCustody",
      numberFormat: {
        type: "NUMBER",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Missing Custody",
      key: "missingCustody",
      numberFormat: {
        type: "NUMBER",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Investment Required",
      key: "investmentRequired",
      numberFormat: {
        type: "CURRENCY",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Investment Rate",
      key: "investmentRate",
      numberFormat: {
        type: "PERCENT",
        pattern: "0.00%",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Current dividends",
      key: "currentDividends",
      numberFormat: {
        type: "CURRENCY",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Target dividends",
      key: "targetDividends",
      numberFormat: {
        type: "CURRENCY",
        pattern: "",
      },
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
      title: "Average yield",
      key: "averageYield",
      numberFormat: {
        type: "PERCENT",
        pattern: "0.00%",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },

    {
      title: "Objetive Strategy",
      key: "objectiveStrategy",
      numberFormat: {
        type: "NUMBER",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Objetive Value",
      key: "objectiveValue",
      numberFormat: {
        type: "CURRENCY",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Objetive Custody",
      key: "objectiveCustody",
      numberFormat: {
        type: "NUMBER",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
    {
      title: "Objective Investment",
      key: "objectiveInvestment",
      numberFormat: {
        type: "CURRENCY",
        pattern: "",
      },
      wrapStrategy: "WRAP",
      backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
    },
  ];

  const rows: SheetRow[] = wallet.map((stock) => {
    const row: SheetRow = headers.reduce((row, header) => {
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
