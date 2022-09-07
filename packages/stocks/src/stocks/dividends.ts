import type { AverageDividends, StockDividends } from "../types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

export function calculateAverageDividends(
  dividendsData: StockDividends[],
  currentPrice: number,
  rangeInYears: number
): AverageDividends {
  const average = calculateDividends(dividendsData, rangeInYears);

  return {
    averageValue: average,
    averageYield: (average * 100) / currentPrice,
  };
}

function calculateDividends(
  dividendsData: StockDividends[],
  rangeInYears: number
): number {
  const dividendsLimit = dayjs().subtract(rangeInYears, "year");

  const lastDividends = dividendsData.filter((dividends) => {
    const { paymentDate } = dividends;
    const formattedPaymentDate = dayjs(paymentDate, "DD/MM/YYYY");

    return dividendsLimit <= formattedPaymentDate;
  });

  const totalDividends = lastDividends.reduce((totalDividends, dividends) => {
    const { value } = dividends;
    return totalDividends + value;
  }, 0);

  return totalDividends > 0 ? totalDividends / rangeInYears : 0;
}
