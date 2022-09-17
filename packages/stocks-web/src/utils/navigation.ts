// routes

import type { Route } from '@/types';

export const routes: Route[] = [
  {
    label: 'Portfólio',
    url: '/portfolio'
  },
  {
    label: 'Stocks',
    pages: [
      {
        label: 'Sectors',
        url: '/stocks/sectors'
      },
      {
        label: 'Sub Sectors',
        url: '/stocks/sub-sectors'
      },
      {
        label: 'Segments',
        url: '/stocks/segments'
      },
      {
        label: 'Companies',
        url: '/stocks/companies'
      },
      {
        label: 'Tickets',
        url: '/stocks/tickets'
      }
    ]
  },
  {
    label: 'Status',
    url: '/status'
  },
  {
    label: 'Filters',
    url: '/filters'
  }
];
