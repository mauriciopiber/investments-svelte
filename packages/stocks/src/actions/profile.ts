import { parseRate } from "$utils/parseRate";
import dayjs from "dayjs";

import { writeSpreadsheet } from "src/utils/spreadsheet";
import { loadWalletStocks } from "src/stocks/stocks";
import type { SheetHeaders, ProfileReport, WalletAsset } from "src/types";

const headers: SheetHeaders<keyof ProfileReport>[] = [
  {
    title: "Datetime",
    key: "datetime",
    numberFormat: null,
    wrapStrategy: "WRAP",
    backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
  },
  {
    title: "Invested",
    key: "invested",
    numberFormat: {
      type: "CURRENCY",
      pattern: "",
    },
    wrapStrategy: "WRAP",
    backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
  },
  {
    title: "Liquidity",
    key: "liquidity",
    numberFormat: {
      type: "CURRENCY",
      pattern: "",
    },
    wrapStrategy: "WRAP",
    backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
  },
  {
    title: "Price Results",
    key: "priceResults",
    numberFormat: {
      type: "CURRENCY",
      pattern: "",
    },
    wrapStrategy: "WRAP",
    backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
  },
  {
    title: "Price Rate Results",
    key: "priceRateResults",
    numberFormat: {
      type: "PERCENT",
      pattern: "0.00%",
    },
    wrapStrategy: "WRAP",
    backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
  },
  {
    title: "Dividends Value",
    key: "dividendsValue",
    numberFormat: {
      type: "CURRENCY",
      pattern: "",
    },
    wrapStrategy: "WRAP",
    backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
  },
  {
    title: "Dividends Yield",
    key: "dividendsYield",
    numberFormat: {
      type: "PERCENT",
      pattern: "0.00%",
    },
    wrapStrategy: "WRAP",
    backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
  },
  {
    title: "# of Sectors",
    key: "sectorsCount",
    numberFormat: {
      type: "NUMBER",
      pattern: "",
    },
    wrapStrategy: "WRAP",
    backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
  },
  {
    title: "# of Stocks",
    key: "stocksCount",
    numberFormat: {
      type: "NUMBER",
      pattern: "",
    },
    wrapStrategy: "WRAP",
    backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
  },
  {
    title: "# of Shares",
    key: "sharesCount",
    numberFormat: {
      type: "NUMBER",
      pattern: "",
    },
    wrapStrategy: "WRAP",
    backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
  },
  {
    title: "Goal of Shares",
    key: "goalOfShares",
    numberFormat: {
      type: "NUMBER",
      pattern: "",
    },
    wrapStrategy: "WRAP",
    backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
  },
  {
    title: "Goal of Investment",
    key: "goalOfInvestment",
    numberFormat: {
      type: "CURRENCY",
      pattern: "",
    },
    wrapStrategy: "WRAP",
    backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
  },
  {
    title: "Progress of shares",
    key: "progressOfShares",
    numberFormat: {
      type: "PERCENT",
      pattern: "0.00%",
    },
    wrapStrategy: "WRAP",
    backgroundColor: { red: 1, green: 1, blue: 1, alpha: 1 },
  },
];

export async function updateProfile(range: number) {
  const rows: ProfileReport[] = (await getRows(
    "Profile",
    headers
  )) as ProfileReport[];

  const newProfileEntry = await createProfileEntry(range);

  const profile: ProfileReport[] = [...rows, newProfileEntry];

  await setProfileSpreadsheet("Profile", profile);
}

async function createProfileEntry(range: number): Promise<ProfileReport> {
  const walletAssets: WalletAsset[] = await loadWalletStocks(range);

  const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");

  const invested = walletAssets.reduce(
    (walletPrice, walletItem) =>
      walletPrice + walletItem.custody * walletItem.averagePrice,
    0
  );

  const liquidity = walletAssets.reduce(
    (walletPrice, walletItem) =>
      walletPrice + walletItem.custody * walletItem.stock.price,
    0
  );

  const dividendsValue = walletAssets.reduce(
    (walletPrice, walletItem) =>
      walletPrice +
      walletItem.custody * walletItem.stock.averageDividends.averageValue,
    0
  );

  const shares = walletAssets.reduce(
    (walletPrice, walletItem) => walletPrice + walletItem.custody,
    0
  );

  const goalOfShares = walletAssets.reduce(
    (walletPrice, walletItem) => walletPrice + walletItem.target,
    0
  );

  const goalOfInvestment = walletAssets.reduce(
    (walletPrice, walletItem) =>
      walletPrice +
      (walletItem.target * walletItem.stock.price -
        walletItem.custody * walletItem.averagePrice),
    0
  );

  const sectors = [
    ...new Set(walletAssets.map((walletItem) => walletItem.stock.sector)),
  ];

  const companies = [
    ...new Set(walletAssets.map((walletItem) => walletItem.stock.company)),
  ];

  const subSectors = [
    ...new Set(walletAssets.map((walletItem) => walletItem.stock.subSector)),
  ];

  const segments = [
    ...new Set(walletAssets.map((walletItem) => walletItem.stock.segment)),
  ];

  const dividendsYield = parseRate(liquidity, dividendsValue);

  const diffPriceLiquidity = liquidity - invested;

  const rate = parseRate(invested, liquidity);

  const ratePriceLiquidity = rate > 1 ? rate - 1 : rate;

  const progressOfShares = parseRate(goalOfShares, shares);

  const profile: ProfileReport = {
    datetime: timestamp,
    invested,
    liquidity,
    priceResults: diffPriceLiquidity,
    priceRateResults: ratePriceLiquidity,
    dividendsValue,
    dividendsYield,
    stocksCount: walletAssets.length,
    sectorsCount: sectors.length,
    companiesCount: companies.length,
    subSectorsCount: subSectors.length,
    segmentsCount: segments.length,
    sharesCount: shares,
    goalOfShares,
    goalOfInvestment,
    progressOfShares,
  };
  return profile;
}

async function setProfileSpreadsheet(
  sheetName: string,
  dividendGoals: ProfileReport[]
) {
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
