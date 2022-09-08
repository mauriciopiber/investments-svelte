import { getSectors } from '@/lib/stocks-mongo';

export async function load() {
  const sectors = await getSectors();

  return {
    sectors
  };
}
