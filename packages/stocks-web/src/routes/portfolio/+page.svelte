<script lang="ts">
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';
  import DataTable from '@/components/DataTable/DataTable.svelte';
  import type { BreadcrumbConfig, Header, Rows } from '@/types';

  import type { PortfolioQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { portfolios: PortfolioQuery[] };
  const { portfolios } = data;

  const headers: Header = [
    {
      key: 'name',
      label: 'Name'
    },
    {
      key: 'currentPrice',
      label: 'Price',
      type: 'currency'
    },
    {
      key: 'current',
      label: 'Current'
    },
    {
      key: 'currentAmount',
      label: 'Current Amount',
      type: 'currency'
    },
    {
      key: 'objective',
      label: 'Objective'
    },
    {
      key: 'objectiveMissing',
      label: 'Objective Missing'
    },
    {
      key: 'objectiveAmount',
      label: 'Objective Amount',
      type: 'currency'
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
    const { ticket, current, objective } = portfolio;

    const objectiveMissing = objective - current;
    return {
      id: ticket.name,
      name: ticket.name,
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
      }
    };
  });
  const breadcrumb: BreadcrumbConfig = [{ key: 'investments' }, { key: 'portfolio' }];
</script>

<svelte:head>
  <title>Portfolio</title>
</svelte:head>

<Breadcrumb config={breadcrumb} />

<DataTable {headers} {rows} />
