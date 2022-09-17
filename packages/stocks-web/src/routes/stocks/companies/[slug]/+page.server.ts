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
          income {
            range {
              averageIncome
            averageYield
            }
          }
        }
        segment {
          name
          slug
        }
        sector {
          name
          slug
        }
        subSector {
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
