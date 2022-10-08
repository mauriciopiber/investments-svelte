import { fetchGraphql } from '@/utils/fetch';

export async function load() {
  const STOCK_PAGE = `
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
                    averageAmount
                    averageYield
                  }
                }
              }
            }
          }
        }
      }
    }`;

  const data = await fetchGraphql(STOCK_PAGE);

  return {
    sectors: data.sectors
  };
}
