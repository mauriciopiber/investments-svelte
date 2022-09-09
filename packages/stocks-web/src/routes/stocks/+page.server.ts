import { fetchGraphql } from '@/utils/fetch';

export async function load() {
  const queryStocks = `
    query {
      sectors {
        name
        slug
        income {
          averageAmount
          averageYield
        }
        subSectors {
          name
          slug
          income {
            averageAmount
            averageYield
          }
          segments {
            name
            slug
            income {
              averageAmount
              averageYield
            }
            companies {
              name
              slug
              income {
                averageAmount
                averageYield
              }
              tickets {
                name
                slug
                income {

                  range {
                    averageIncome
                    averageYield

                  }

                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphql(queryStocks);

  return {
    sectors: data.sectors
  };
}
