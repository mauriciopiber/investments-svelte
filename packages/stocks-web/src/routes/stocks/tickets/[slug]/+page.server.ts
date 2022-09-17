import { fetchGraphql } from '@/utils/fetch';
import type { Page } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }: Page) {
  const { slug } = params;

  const queryStocks = `
    query {
      ticket(slug: "${slug}") {
        name
        slug
        currentPrice
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
      }

    }
  `;

  const data = await fetchGraphql(queryStocks);

  const { ticket } = data;

  return {
    ticket
  };
}
