import { getSegments } from '@/lib/stocks-mongo';
import type { Page } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }: Page) {
  const { slug } = params;

  const segments = await getSegments(slug);

  // console.log(config);
  // const sectors = await getSectors();

  return {
    title: slug,
    segments
  };
}
