import type { StockFilter, StockIndicatorsKeys, PartialStock } from "src/types";

function applyMaxFilter(
  stocks: PartialStock[],
  indicator: StockIndicatorsKeys,
  value: number
): PartialStock[] {
  return stocks.filter(
    (stock) => (stock.indicators[indicator] as unknown as number) <= value
  );
}

function applyMinFilter(
  stocks: PartialStock[],
  indicator: StockIndicatorsKeys,
  value: number
): PartialStock[] {
  return stocks.filter(
    (stock) => (stock.indicators[indicator] as unknown as number) >= value
  );
}

export function filterStocks(stocks: PartialStock[], filters: StockFilter[]) {
  if (filterStocks.length <= 0) {
    return stocks;
  }

  filters.forEach(({ type, indicator, value }) => {
    if (type === "max") {
      stocks = applyMaxFilter(stocks, indicator, value);
      return;
    }

    if (type === "min") {
      stocks = applyMinFilter(stocks, indicator, value);
    }
  });

  return stocks;
}
