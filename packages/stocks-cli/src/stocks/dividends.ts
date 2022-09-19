import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import type {
  AverageIncome,
  Income,
  StockDividends,
} from "@pibernetwork/stocks-model/src/types";
import { parseRate } from "./../utils/parseRate";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
const DIVIDENDS = "Dividendo";
const INTEREST = "Juros Sobre Capital Próprio";

function calculateTotalIncome(incomes: StockDividends[]): number {
  if (incomes.length <= 0) {
    return 0;
  }
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
  if (isNaN(totalIncome) || !Number.isFinite(totalIncome)) {
    throw new Error(`Total income is not a number -> ${totalIncome}}`);
  }
  if (isNaN(price) || !Number.isFinite(price)) {
    throw new Error(`Total price is not a number -> ${price}`);
  }

  const averageAmount = totalIncome / rangeInYears;

  if (isNaN(averageAmount) || !Number.isFinite(averageAmount)) {
    throw new Error(`Average income income is not a number -> ${price}`);
  }

  const averageYield = (price && (averageAmount * 100) / price) || 0;

  if (isNaN(averageYield) || !Number.isFinite(averageYield)) {
    throw new Error(`Average yield is not a number -> ${totalIncome} ${price}`);
  }
  return {
    averageAmount,
    averageYield,
    totalIncome,
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

export function calculateDividends(
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
