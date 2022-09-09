import type { AverageDividends, StockDividends } from "../types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import type {
  AverageIncome,
  Income,
} from "@pibernetwork/stocks-model/src/types";
import { parseRate } from "./../utils/parseRate";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
const DIVIDENDS = "Dividendo";
const INTEREST = "Juros Sobre Capital Próprio";

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

function calculateTotalIncome(incomes: StockDividends[]): number {
  return incomes.reduce((totalDividends, dividends) => {
    const { value } = dividends;
    return totalDividends + value;
  }, 0);
}

function calculateAverageIncome(
  totalIncome: number,
  rangeInYears: number,
  price: number
): AverageIncome {
  const averageIncome = totalIncome / rangeInYears;
  return {
    averageIncome,
    averageYield: (averageIncome * 100) / price / 100,
    totalIncome: totalIncome,
  };
}

function calculateInterestIncome(
  incomes: StockDividends[],
  rangeInYears: number,
  price: number
) {
  const others = incomes.filter((income) => income.type === INTEREST);

  const totalOthers = calculateTotalIncome(others);

  return calculateAverageIncome(totalOthers, rangeInYears, price);
}

function calculateOthersIncome(
  incomes: StockDividends[],
  rangeInYears: number,
  price: number
) {
  const others = incomes.filter(
    (income) => income.type !== DIVIDENDS && income.type !== INTEREST
  );

  const totalOthers = calculateTotalIncome(others);

  return calculateAverageIncome(totalOthers, rangeInYears, price);
}

function calculateDividendsIncome(
  incomes: StockDividends[],
  rangeInYears: number,
  price: number
) {
  const dividends = incomes.filter((income) => income.type === DIVIDENDS);

  const totalDividends = calculateTotalIncome(dividends);

  return calculateAverageIncome(totalDividends, rangeInYears, price);
}

export function calculateDividendsV2(
  dividendsData: StockDividends[],
  currentPrice: number,
  rangeInYears: number
): Income {
  const startDate = dayjs();
  const endDate = dayjs().subtract(rangeInYears, "year");

  const incomeInRange = dividendsData.filter((dividends) => {
    const { paymentDate } = dividends;
    const formattedPaymentDate = dayjs(paymentDate, "DD/MM/YYYY");

    return endDate <= formattedPaymentDate;
  });

  const incomeTotal = calculateTotalIncome(incomeInRange);

  return {
    startDate: startDate.toDate(),
    endDate: endDate.toDate(),
    rangeInYears,
    incomeTotal,
    incomeYield: parseRate(currentPrice, incomeTotal),
    range: calculateAverageIncome(incomeTotal, rangeInYears, currentPrice),
    interest: calculateInterestIncome(
      incomeInRange,
      rangeInYears,
      currentPrice
    ),
    dividends: calculateDividendsIncome(
      incomeInRange,
      rangeInYears,
      currentPrice
    ),
    others: calculateOthersIncome(incomeInRange, rangeInYears, currentPrice),
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
