import { getSubSectors } from '@/lib/stocks-mongo';
import type { Page } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }: Page) {
  const { slug } = params;

  const subSectors = await getSubSectors(slug);

  // console.log(config);
  // const sectors = await getSectors();

  return {
    title: slug,
    subSectors
  };
}
