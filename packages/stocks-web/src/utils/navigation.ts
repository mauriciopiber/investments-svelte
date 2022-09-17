// routes

import type { Breadcrumb, BreadcrumbConfig, Route } from '@/types';

export const HOME_LABEL = 'Investments';
export const HOME_URL = '/';

export const PORTFOLIO_LABEL = 'Portfolio';
export const PORTFOLIO_URL = '/portfolio';

export const STOCKS_LABEL = 'Stocks';
export const STOCKS_URL = '/stocks';

export const SECTOR_LABEL = 'Sectors';
export const SECTOR_URL = '/stocks/sectors';

export const SUBSECTOR_LABEL = 'Sub Sectors';
export const SUBSECTOR_URL = '/stocks/sub-sectors';

export const SEGMENT_LABEL = 'Segments';
export const SEGMENT_URL = '/stocks/segments';

export const COMPANY_LABEL = 'Companies';
export const COMPANY_URL = '/stocks/companies';

export const TICKET_LABEL = 'Tickets';
export const TICKET_URL = '/stocks/tickets';

export const routes: Route[] = [
  {
    label: PORTFOLIO_LABEL,
    url: PORTFOLIO_URL
  },
  {
    label: STOCKS_LABEL,
    pages: [
      {
        label: STOCKS_LABEL,
        url: STOCKS_URL
      },
      {
        label: SECTOR_LABEL,
        url: SECTOR_URL
      },
      {
        label: SUBSECTOR_LABEL,
        url: SUBSECTOR_URL
      },
      {
        label: SEGMENT_LABEL,
        url: SEGMENT_URL
      },
      {
        label: COMPANY_LABEL,
        url: COMPANY_URL
      },
      {
        label: TICKET_LABEL,
        url: TICKET_URL
      }
    ]
  },
  {
    label: 'Status',
    url: '/sandbox/status'
  },
  {
    label: 'Filters',
    url: '/sandbox/filters'
  }
];

function getItem(key: string, slug: string | undefined): { href: string; label: string } {
  switch (key) {
    case 'investments': {
      return {
        label: HOME_LABEL,
        href: HOME_URL
      };
    }
    case 'stocks': {
      return {
        label: STOCKS_LABEL,
        href: STOCKS_URL
      };
    }
    case 'sectors': {
      return {
        label: SECTOR_LABEL,
        href: SECTOR_URL
      };
    }
    case 'sub-sectors': {
      return {
        label: SUBSECTOR_LABEL,
        href: SUBSECTOR_URL
      };
    }
    case 'segments': {
      return {
        label: SEGMENT_LABEL,
        href: SEGMENT_URL
      };
    }
    case 'companies': {
      return {
        label: COMPANY_LABEL,
        href: COMPANY_URL
      };
    }
    case 'tickets': {
      return {
        label: TICKET_LABEL,
        href: TICKET_URL
      };
    }
    default:
      throw new Error(`Missing breadcrumb for ${key}`);
  }
}

export function createBreadcrumb(config: BreadcrumbConfig): Breadcrumb {
  const currentPage = config.length - 1;

  return config.map((configItem, index) => {
    const item = getItem(configItem.key, undefined);

    if (index === 0) {
      return {
        ...item,
        isRoot: true
      };
    }

    if (index === currentPage) {
      return {
        ...item,
        isCurrentPage: true
      };
    }

    return item;
  });
}
