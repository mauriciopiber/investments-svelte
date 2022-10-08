<script lang="ts">
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';
  import DataTable from '@/components/DataTable/DataTable.svelte';
  import type { BreadcrumbConfig, Header, Rows } from '@/types';
  import type { CompanyQuery } from '@pibernetwork/model/src/types';
  export let data: { company: CompanyQuery };
  const { company } = data;

  const { sector, subSector, segment, tickets } = company;

  const breadcrumb: BreadcrumbConfig = [
    { key: 'investments' },
    { key: 'stocks' },
    { key: 'sector', slug: sector.slug, label: sector.name },
    { key: 'sub-sector', slug: subSector.slug, label: subSector.name },
    { key: 'segment', slug: segment.slug, label: segment.name },
    { key: 'company', slug: company.slug, label: company.name }
  ];

  const headers: Header = [
    {
      key: 'ticket',
      label: 'Ticket',
      type: 'link'
    },
    {
      key: 'averageAmount',
      label: 'Average Amount',
      type: 'currency'
    },
    {
      key: 'averageYield',
      label: 'Average Yield',
      type: 'rate'
    }
  ];

  const rows: Rows = tickets.map((ticket) => {
    return {
      ticket: { value: ticket.name, href: `/stocks/tickets/${ticket.slug}` },
      averageAmount: ticket.income.range.averageAmount,
      averageYield: ticket.income.range.averageYield
    };
  });
</script>

<svelte:head>
  <title>Company - {company.name}</title>
</svelte:head>

<Breadcrumb config={breadcrumb} />

<DataTable {headers} {rows} />
