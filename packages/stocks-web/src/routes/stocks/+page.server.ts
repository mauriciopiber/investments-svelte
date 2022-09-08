import { fetchGraphql } from '@/utils/fetch';

export async function load() {
  const queryStocks = `
    query {
      sectors {
        name
        slug
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

  return {
    sectors: data.sectors
  };
}
