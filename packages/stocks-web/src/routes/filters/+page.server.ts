import { fetchGraphql } from '@/utils/fetch';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const queryStocks = `
    query {
      filters {
        key
        range {
          min
          max
        }
      }
    }
  `;

  const data = await fetchGraphql(queryStocks);

  const { filters } = data;

  return {
    filters
  };
}
