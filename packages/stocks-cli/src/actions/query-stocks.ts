import { StockRepository } from "@pibernetwork/stocks-model/src/repository/stock";
import type { StockSource } from "@pibernetwork/stocks-model/src/types";

const stockRepository = new StockRepository(process.env.DATABASE_CONNECTION);

type StockFilterTypes = keyof StockSource;

type StockFilter = {
  [key in StockFilterTypes]: {
    min: number;
    max: number;
  };
};

export async function queryStocks() {
  // await stockRepository.insertMany(stocks);
  const allStocks = await stockRepository.queryAll({});
  console.log(allStocks.length);

  const firstFilterStocks = await stockRepository.queryAggregate([
    {
      $match: {
        // valorDeMercado: { $gt: 10 * 1000000000 },
        freeFloat: { $ne: null },
        dividendsYield: { $ne: null },
        minYear: { $ne: null },
        maxYear: { $ne: null },
        minMonth: { $ne: null },
        maxMonth: { $ne: null },
      },
    },
    {
      $match: {
        freeFloat: { $gt: 40 },
        investidores: { $gt: 100000 },
        dividaLiquidaPorPatrimonioLiquido: { $lte: 1 },
        dividaLiquidaPorEBITDA: { $lte: 1 },
        liquidezMediaDiaria: { $gt: 1000000 },
        // dividaLiquidaPorEBITDA: { $lte: 1 },
      },
    },
  ]);

  firstFilterStocks.forEach((stock: any) => {
    console.log(stock.ticket);
  });

  console.log(firstFilterStocks.length);

  const secondFilterStocks = await stockRepository.queryAggregate([
    {
      $match: {
        pessoaFisica: { $gt: 1000 },
        liquidezMediaDiaria: { $gt: 1000 * 100 },
        patrimonioLiquido: { $ne: null, $gt: 0 },
        currentPrice: { $ne: null, $gt: 0 },
        valorDeFirma: { $ne: null, $gt: 0 },
        valorDeMercado: { $ne: null, $gt: 0 },
        freeFloat: { $ne: null, $gt: 0 },
      },
    },
    {
      $sort: { currentPrice: -1 },
    },
    {
      $limit: 1,
    },
  ]);

  console.log(
    `Excluded stocks: ${allStocks.length - secondFilterStocks.length}`
  );

  const stockKeys = await stockRepository.queryAggregate([
    {
      $unset: [
        "_id",
        "ticket",
        "segment",
        "sector",
        "subSector",
        "url",
        "name",
        "code",
        "dividends",
        "segmentoDeListagem",
        "company",
      ],
    },
    { $project: { arrayofkeyvalue: { $objectToArray: "$$ROOT" } } },
    { $unwind: "$arrayofkeyvalue" },
    { $group: { _id: null, allKeys: { $addToSet: "$arrayofkeyvalue.k" } } },
    { $sort: { allKeys: 1 } },
  ]);

  const stockItem = stockKeys[0];
  // console.log(stockItem);
  const { allKeys } = stockItem as { allKeys: StockFilterTypes[] };

  const filters: Partial<StockFilter> = {};

  for (const key of allKeys) {
    try {
      const range = await getRange(key);
      filters[key] = range;
    } catch (e) {
      console.error(e);
    }
  }

  console.log(filters);

  await stockRepository.close();
}

async function getFilterRanges() {
  const stockKeys = await stockRepository.queryAggregate([
    {
      $unset: [
        "_id",
        "ticket",
        "segment",
        "sector",
        "subSector",
        "url",
        "name",
        "code",
        "dividends",
        "segmentoDeListagem",
        "company",
      ],
    },
    { $project: { arrayofkeyvalue: { $objectToArray: "$$ROOT" } } },
    { $unwind: "$arrayofkeyvalue" },
    { $group: { _id: null, allKeys: { $addToSet: "$arrayofkeyvalue.k" } } },
    { $sort: { allKeys: 1 } },
  ]);

  const stockItem = stockKeys[0];
  // console.log(stockItem);
  const { allKeys } = stockItem as { allKeys: StockFilterTypes[] };

  const filters: Partial<StockFilter> = {};

  for (const key of allKeys) {
    try {
      const range = await getRange(key);
      filters[key] = range;
    } catch (e) {
      console.error(e);
    }
  }

  return filters;
}

async function getRange(key: StockFilterTypes) {
  const orderByMin = await stockRepository.queryAggregate([
    {
      $match: {
        pessoaFisica: { $gt: 1000 },
        liquidezMediaDiaria: { $gt: 1000 * 100 },
        patrimonioLiquido: { $ne: null, $gt: 0 },
        currentPrice: { $ne: null, $gt: 0 },
        valorDeFirma: { $ne: null, $gt: 0 },
        valorDeMercado: { $ne: null, $gt: 0 },
        freeFloat: { $ne: null, $gt: 0 },
        [key]: { $ne: null },
      },
    },
    {
      $sort: { [key]: 1 },
    },
    {
      $limit: 1,
    },
  ]);

  const orderByMax = await stockRepository.queryAggregate([
    {
      $match: {
        pessoaFisica: { $gt: 1000 },
        liquidezMediaDiaria: { $gt: 1000 * 100 },
        patrimonioLiquido: { $ne: null, $gt: 0 },
        currentPrice: { $ne: null, $gt: 0 },
        valorDeFirma: { $ne: null, $gt: 0 },
        valorDeMercado: { $ne: null, $gt: 0 },
        freeFloat: { $ne: null, $gt: 0 },
      },
    },
    {
      $sort: { [key]: -1 },
    },
    {
      $limit: 1,
    },
  ]);

  const minStock = orderByMin[0];

  const maxStock = orderByMax[0];

  const minValue = minStock[key];
  const maxValue = maxStock[key];

  return {
    min: minValue,
    max: maxValue,
  };
}
