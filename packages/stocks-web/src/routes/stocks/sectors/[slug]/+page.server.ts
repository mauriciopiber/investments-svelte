import { fetchGraphql } from '@/utils/fetch';
import type { Page } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }: Page) {
  const { slug } = params;

  const queryStocks = `
    query {
      sector(slug: "${slug}") {
        name
        slug
        subSectors {
          name
          slug
          segments {
            name
            slug
            companies {
              name
              slug
              tickets {
                name
                slug
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphql(queryStocks);

  const { sector } = data;

  return {
    sector
  };
}
