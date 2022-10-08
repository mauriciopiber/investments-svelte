<script lang="ts">
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';
  import DataTable from '@/components/DataTable/DataTable.svelte';
  import type { BreadcrumbConfig, Header, Rows } from '@/types';

  import type { PortfolioQuery } from '@pibernetwork/model/src/types';
  export let data: { portfolios: PortfolioQuery[] };
  const { portfolios } = data;

  const headers: Header = [
    {
      key: 'name',
      label: 'Name',
      type: 'link'
    },
    {
      key: 'currentPrice',
      label: 'C. Price'
    },
    {
      key: 'averagePrice',
      label: 'A. Price'
    },

    {
      key: 'intrinsicValue',
      label: 'G. Price'
    },
    {
      key: 'intrinsicRate',
      label: 'G. Rate'
    },

    {
      key: 'liquidationAmount',
      label: 'L. Amount'
    },
    {
      key: 'liquidationRate',
      label: 'L. Rate'
    },
    {
      key: 'current',
      label: 'Current'
    },

    {
      key: 'objective',
      label: 'Objective'
    },
    {
      key: 'objectiveMissing',
      label: 'O. Missing'
    },
    {
      key: 'investmentAmount',
      label: 'Inv. Amount'
    },
    {
      key: 'averageYield',
      label: 'A. Yield'
    },
    {
      key: 'averageAmount',
      label: 'A. Amount'
    },
    {
      key: 'currentDividends',
      label: 'C. Dividends'
    },
    {
      key: 'objectiveDividends',
      label: 'O. Dividends'
    },

    {
      key: 'company',
      label: 'Company',
      type: 'link'
    },
    {
      key: 'sector',
      label: 'Sector',
      type: 'link'
    },
    {
      key: 'subSector',
      label: 'Sub Sector',
      type: 'link'
    },
    {
      key: 'segment',
      label: 'Segment',
      type: 'link'
    }
  ];

  const rows: Rows = portfolios.map((portfolio) => {
    const {
      ticket,
      current,
      objective,
      averagePrice,
      liquidationAmount,
      liquidationRate,
      investmentAmount,
      currentDividends,
      objectiveDividends
    } = portfolio;

    const { income } = ticket;
    const { range } = income;
    const { averageAmount, averageYield } = range;

    const objectiveMissing = objective - current;
    return {
      name: { value: ticket.name, href: `/stocks/tickets/${ticket.slug}` },
      liquidationAmount,
      liquidationRate,
      investmentAmount,
      currentDividends,
      objectiveDividends,
      averagePrice,
      averageYield,
      averageAmount,
      current,
      currentPrice: ticket.currentPrice,
      currentAmount: current * ticket.currentPrice,
      objective,
      objectiveMissing,
      objectiveAmount: objectiveMissing * ticket.currentPrice,
      company: { value: ticket.company.name, href: `/stocks/companies/${ticket.company.slug}` },
      segment: {
        value: ticket.company.segment.name,
        href: `/stocks/segments/${ticket.company.segment.slug}`
      },
      sector: {
        value: ticket.company.sector.name,
        href: `/stocks/sectors/${ticket.company.sector.slug}`
      },
      subSector: {
        value: ticket.company.subSector.name,
        href: `/stocks/sub-sectors/${ticket.company.subSector.slug}`
      },
      intrinsicValue: ticket.intrinsicValue || 0,
      intrinsicRate: ticket.intrinsicRate || 0
    };
  });
  const breadcrumb: BreadcrumbConfig = [{ key: 'investments' }, { key: 'portfolio' }];
</script>

<svelte:head>
  <title>Portfolio</title>
</svelte:head>

<Breadcrumb config={breadcrumb} />

<DataTable {headers} {rows} />
