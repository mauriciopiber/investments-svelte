import { fetchGraphql } from '@/utils/fetch';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const queryStocks = `
    query {
      tickets {
        name
        slug
        currentPrice
        company {
          name
          slug
          sector {
            name
            slug
          }
          subSector {
            name
            slug
          }
          segment {
            name
            slug
          }
        }
        income {
          startDate
          endDate
          rangeInYears
          incomeTotal
          incomeYield
          range {
            averageAmount
            averageYield
            totalIncome
          }
          interest {
            averageAmount
            averageYield
            totalIncome
          }
          dividends {
            averageAmount
            averageYield
            totalIncome
          }
          others {
            averageAmount
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
