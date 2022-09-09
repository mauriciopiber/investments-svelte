import { fetchGraphql } from '@/utils/fetch';
import { STOCK_PAGE } from '@/queries/stocks';

export async function load() {
  const data = await fetchGraphql(STOCK_PAGE);

  const testQuery = await fetchGraphql(`
  query {

    companies {
      name
      slug
    }
  }
  `);

  console.log(testQuery);

  return {
    sectors: data.sectors
  };
}
