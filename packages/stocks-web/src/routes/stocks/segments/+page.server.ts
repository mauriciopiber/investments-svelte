import { fetchGraphql } from '@/utils/fetch';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const queryStocks = `
    query {


          segments {
            name
            slug
            income {
              averageYield
              averageAmount
            }
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
  `;

  const data = await fetchGraphql(queryStocks);

  const { segments } = data;

  return {
    segments
  };
}
