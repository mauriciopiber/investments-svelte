import { fetchGraphql } from '@/utils/fetch';
import { STOCK_PAGE } from '@/queries/stocks';

export async function load() {
  const data = await fetchGraphql(STOCK_PAGE);

  return {
    sectors: data.sectors
  };
}
