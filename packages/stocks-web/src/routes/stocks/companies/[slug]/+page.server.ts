import { fetchGraphql } from '@/utils/fetch';
import type { Page } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }: Page) {
  const { slug } = params;

  const queryStocks = `
    query {
      company(slug: "${slug}") {
        name
        slug
        tickets {
          name
          slug
        }
      }
    }
  `;

  const data = await fetchGraphql(queryStocks);

  const { company } = data;

  return {
    company
  };
}
