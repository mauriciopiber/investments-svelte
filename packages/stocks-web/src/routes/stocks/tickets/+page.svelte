<script lang="ts">
  import type { TicketQuery } from '@pibernetwork/stocks-model/src/types';
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';
  import DataTable from '@/components/DataTable/DataTable.svelte';
  import type { Header, Rows } from '@/types';
  export let data: { tickets: TicketQuery[] };
  const { tickets } = data;

  const headers: Header = [
    {
      key: 'name',
      label: 'Name',
      type: 'link'
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
    },
    {
      key: 'price',
      label: 'Price',
      type: 'currency'
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
      id: ticket.slug,
      name: { value: ticket.name, href: `/stocks/tickets/${ticket.slug}` },
      sector: {
        value: ticket.company.sector.name,
        href: `/stocks/sectors/${ticket.company.sector.slug}`
      },
      subSector: {
        value: ticket.company.subSector.name,
        href: `/stocks/sub-sectors/${ticket.company.subSector.slug}`
      },
      segment: {
        value: ticket.company.segment.name,
        href: `/stocks/segments/${ticket.company.segment.slug}`
      },
      company: {
        href: `/stocks/companies/${ticket.company.slug}`,
        value: ticket.company.name
      },
      averageAmount: ticket.income.range.averageIncome,
      averageYield: ticket.income.range.averageYield,
      price: ticket.price
    };
  });

  const breadcrumb: { key: string }[] = [
    { key: 'investments' },
    { key: 'stocks' },
    { key: 'sectors' },
    { key: 'sub-sectors' },
    { key: 'segments' },
    { key: 'companies' },
    { key: 'tickets' }
  ];
</script>

<svelte:head>
  <title>Tickets</title>
</svelte:head>

<Breadcrumb config={breadcrumb} />

<DataTable {headers} {rows} />
