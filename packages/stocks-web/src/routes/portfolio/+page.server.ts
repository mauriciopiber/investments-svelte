import { fetchGraphql } from '@/utils/fetch';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const queryStocks = `
    query {
      portfolios {
        current
        objective
        averagePrice
        ticket {
          name
          currentPrice
          company {
            name
            slug
            income {
              averageAmount,
              averageYield
            }
            sector {
              name
              slug
              income {
                averageAmount,
                averageYield
              }
            }
            subSector {
               name
               slug
               income {
                averageAmount,
                averageYield
              }
            }
            segment {
             name
             slug
             income {
              averageAmount,
              averageYield
            }
            }
          }
        }
      }

    }
  `;

  const data = await fetchGraphql(queryStocks);

  const { portfolios } = data;

  return {
    portfolios
  };
}
