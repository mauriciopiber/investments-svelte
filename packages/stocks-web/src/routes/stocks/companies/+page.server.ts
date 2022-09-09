import { fetchGraphql } from '@/utils/fetch';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const queryStocks = `
    query {
      companies {
        name
        slug
        income {
          averageYield
          averageAmount
        }
        tickets {
          name
          slug
        }
      }
    }
  `;

  const data = await fetchGraphql(queryStocks);

  const { companies } = data;

  return {
    companies
  };
}
