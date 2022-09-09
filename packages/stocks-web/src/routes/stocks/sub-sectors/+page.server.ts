import { fetchGraphql } from '@/utils/fetch';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const queryStocks = `
    query {

      subSectors {
        name
        slug
        income {
          averageYield
          averageAmount
        }
        segments {
          name
          slug
          companies {
            name
            slug
            tickets {
              name
              slug
            }
          }
        }
      }

    }
  `;

  const data = await fetchGraphql(queryStocks);

  const { subSectors } = data;

  return {
    subSectors
  };
}
