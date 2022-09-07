import { getTickets } from '@/lib/stocks';
import type { Page } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }: Page) {
  const { slug } = params;

  const tickets = await getTickets(slug);

  // console.log(config);
  // const sectors = await getSectors();

  return {
    title: slug,
    tickets
  };
}
