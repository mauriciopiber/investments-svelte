import { fetchGraphql } from '@/utils/fetch';
import type { Page } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }: Page) {
  const page = url.searchParams.get('page') || '1;';
  const perPage = url.searchParams.get('perPage') || '10';

  const sortKey = url.searchParams.get('sortKey') || 'income.range.averageYield';
  const sortDirection = url.searchParams.get('sortDirection') || 'desc';

  const queryStocks = `
    query($page: Int, $perPage: Int, $sortKey: String, $sortDirection: String) {

  tickets(input: {page: { current: $page, perPage: $perPage }, sort: {key: $sortKey, direction: $sortDirection }} ) {
    page {
      total
      current
      start
      items
      end
      next
      prev
    }

      items {
        name
        slug
        currentPrice
        intrinsicRate
        intrinsicValue
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
  }
  `;

  const data = await fetchGraphql(queryStocks, {
    page: parseInt(page),
    perPage: parseInt(perPage),
    sortKey,
    sortDirection,
  });

  const { tickets } = data;

  return {
    tickets,
  };
}
