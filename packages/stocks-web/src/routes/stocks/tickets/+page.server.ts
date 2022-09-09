import { fetchGraphql } from '@/utils/fetch';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const queryStocks = `
    query {
      tickets {
        name
        slug
        price
        income {
          startDate
          endDate
          rangeInYears
          incomeTotal
          incomeYield
          range {
            averageIncome
            averageYield
            totalIncome
          }
          interest {
            averageIncome
            averageYield
            totalIncome
          }
          dividends {
            averageIncome
            averageYield
            totalIncome
          }
          others {
            averageIncome
            averageYield
            totalIncome
          }
        }
      }
    }
  `;

  const data = await fetchGraphql(queryStocks);

  const { tickets } = data;

  return {
    tickets
  };
}
