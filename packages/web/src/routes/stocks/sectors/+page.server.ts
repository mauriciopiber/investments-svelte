import { fetchGraphql } from '@/utils/fetch';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const queryStocks = `
    query {
      sectors {
        name
        slug
        income {
          averageYield
          averageAmount
        }
        subSectors {
          name
          slug
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
    }
  `;

  const data = await fetchGraphql(queryStocks);

  const { sectors } = data;

  return {
    sectors
  };
}
