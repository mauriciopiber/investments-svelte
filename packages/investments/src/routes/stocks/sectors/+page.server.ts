import { getSectors } from '@/lib/stocks';

export async function load() {
  const sectors = await getSectors();

  return {
    sectors
  };
}
