import { getStocks, getSectors, getSubSectors, getSegments } from '@/lib/stocks-mongo';

export async function load() {
  const queryStocks = `
  query {
    stocks {

      ticket
    }
  }

`;
  const stocks = await getStocks();

  const sectors = await getSectors();
  const subSectors = await getSubSectors();
  const segments = await getSegments();

  return {
    stocks,
    sectors,
    subSectors,
    segments
  };
}
