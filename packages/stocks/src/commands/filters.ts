import type { StockFilter, StockIndicatorsKeys } from "src/types";

export async function parseCommandFilters(filterArgs: string[]) {
  const filters: StockFilter[] = [];

  for (const filterArg of filterArgs) {
    const filterItems = filterArg.split(":");

    const indicator = filterItems[0] as StockIndicatorsKeys;
    const type = filterItems[1] as "min" | "max";
    const value = parseFloat(filterItems[2]);

    filters.push({
      indicator,
      type,
      value,
    });
  }

  return filters;
}
