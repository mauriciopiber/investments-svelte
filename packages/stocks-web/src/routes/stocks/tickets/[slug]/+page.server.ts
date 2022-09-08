import { fetchGraphql } from '@/utils/fetch';
import type { Page } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }: Page) {
  const { slug } = params;

  const queryStocks = `
    query {
      ticket(slug: "${slug}") {
        name
        slug
      }

    }
  `;

  const data = await fetchGraphql(queryStocks);

  const { ticket } = data;

  return {
    ticket
  };
}
