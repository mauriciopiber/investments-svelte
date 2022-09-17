import { fetchGraphql } from '@/utils/fetch';
import type { Page } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }: Page) {
  const { slug } = params;

  const queryStocks = `
    query {

      subSector(slug: "${slug}") {
        name
        slug

        sector {
          name
          slug
        }
        segments {
          name
          slug
          income {
            averageAmount
            averageYield
          }

        }
      }

    }
  `;

  const data = await fetchGraphql(queryStocks);

  const { subSector } = data;

  return {
    subSector
  };
}
