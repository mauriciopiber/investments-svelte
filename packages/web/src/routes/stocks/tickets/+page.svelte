<script lang="ts">
  import type { TicketQuery } from '@pibernetwork/model/src/types';
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';
  import DataTable from '@/components/DataTable/DataTable.svelte';
  import type { Header, Rows } from '@/types';
  export let data: { tickets: { items: TicketQuery[] } };
  const { tickets } = data;

  const headers: Header = [
    {
      key: 'name',
      label: 'Name',
      type: 'link',
    },
    {
      key: 'company',
      label: 'Company',
      type: 'link',
    },
    {
      key: 'sector',
      label: 'Sector',
      type: 'link',
    },
    {
      key: 'subSector',
      label: 'Sub Sector',
      type: 'link',
    },
    {
      key: 'segment',
      label: 'Segment',
      type: 'link',
    },
    {
      key: 'currentPrice',
      label: 'Price',
    },
    {
      key: 'intrinsicValue',
      label: 'Intrinsic Value',
    },
    {
      key: 'intrinsicRate',
      label: 'intrinsic Rate',
    },
    {
      key: 'averageAmount',
      label: 'Average Amount',
    },
    {
      key: 'averageYield',
      label: 'Average Yield',
    },
    {
      key: 'incomeAmount',
      label: 'Income Amount',
    },
    {
      key: 'incomeRate',
      label: 'Income Rate',
    },
  ];

  const rows: Rows = tickets.items.map((ticket) => {
    return {
      id: ticket.slug,
      name: { value: ticket.name, href: `/stocks/tickets/${ticket.slug}` },
      sector: {
        value: ticket.company.sector.name,
        href: `/stocks/sectors/${ticket.company.sector.slug}`,
      },
      subSector: {
        value: ticket.company.subSector.name,
        href: `/stocks/sub-sectors/${ticket.company.subSector.slug}`,
      },
      segment: {
        value: ticket.company.segment.name,
        href: `/stocks/segments/${ticket.company.segment.slug}`,
      },
      company: {
        href: `/stocks/companies/${ticket.company.slug}`,
        value: ticket.company.name,
      },
      incomeAmount: ticket.income.incomeTotal,
      incomeRate: ticket.income.incomeYield,
      averageAmount: ticket.income.range.averageAmount,
      averageYield: ticket.income.range.averageYield,
      currentPrice: ticket.currentPrice,
      intrinsicRate: ticket.intrinsicRate || '-',
      intrinsicValue: ticket.intrinsicValue || '-',
    };
  });

  const breadcrumb: { key: string }[] = [
    { key: 'investments' },
    { key: 'stocks' },
    { key: 'sectors' },
    { key: 'sub-sectors' },
    { key: 'segments' },
    { key: 'companies' },
    { key: 'tickets' },
  ];
</script>

<svelte:head>
  <title>Tickets</title>
</svelte:head>

<Breadcrumb config={breadcrumb} />

<DataTable {headers} {rows} />
