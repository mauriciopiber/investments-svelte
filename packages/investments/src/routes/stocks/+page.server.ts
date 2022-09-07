import { getStocks, getSectors, getSubSectors, getSegments } from '@/lib/stocks';

export async function load() {
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
