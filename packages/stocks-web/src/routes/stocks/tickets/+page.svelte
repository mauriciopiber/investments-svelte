<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbItem,
    DataTable,
    Pagination,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Tile
  } from 'carbon-components-svelte';

  import Rate from '@/components/Layout/Rate.svelte';
  import Currency from '@/components/Layout/Currency.svelte';
  import type { TicketQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { tickets: TicketQuery[] };
  const { tickets } = data;

  let pageSize = 25;
  let page = 1;
  let filteredRowIds: string[] = [];
  const headers = [
    {
      key: 'name',
      value: 'Name'
    },
    {
      key: 'company',
      value: 'Company'
    },
    {
      key: 'sector',
      value: 'Sector'
    },
    {
      key: 'subSector',
      value: 'Sub Sector'
    },
    {
      key: 'segment',
      value: 'Segment'
    },
    {
      key: 'price',
      value: 'Price'
    },
    {
      key: 'averageAmount',
      value: 'Average Amount'
    },
    {
      key: 'averageYield',
      value: 'Average Yield'
    }
  ];

  const rows = tickets.map((ticket) => {
    return {
      id: ticket.slug,
      name: ticket.name,
      company: ticket.company.name,
      segment: ticket.company.segment.name,
      sector: ticket.company.sector.name,
      subSector: ticket.company.subSector.name,
      averageAmount: ticket.income.range.averageIncome,
      averageYield: ticket.income.range.averageYield,
      price: ticket.price
    };
  });
</script>

<Tile>
  <Breadcrumb noTrailingSlash>
    <BreadcrumbItem href="/">Investments</BreadcrumbItem>
    <BreadcrumbItem href="/stocks">Stocks</BreadcrumbItem>
    <BreadcrumbItem href="/stocks/sectors">Sectors</BreadcrumbItem>
    <BreadcrumbItem href="/stocks/sub-sectors">Sub Sectors</BreadcrumbItem>
    <BreadcrumbItem href="/stocks/segments">Segments</BreadcrumbItem>
    <BreadcrumbItem href="/stocks/companies">Companies</BreadcrumbItem>
    <BreadcrumbItem href="/stocks/tickets" isCurrentPage>Tickets</BreadcrumbItem>
  </Breadcrumb>
</Tile>
<Tile>
  <h1>Tickets</h1>

  <DataTable sortable size="short" {headers} {rows} {pageSize} {page}>
    <svelte:fragment slot="cell" let:cell>
      {#if cell.key === 'averageAmount' || cell.key === 'price'}
        <Currency value={cell.value} />
      {:else if cell.key === 'averageYield'}
        <Rate value={cell.value} />
      {:else}
        {cell.value}
      {/if}
    </svelte:fragment>
    <Toolbar>
      <ToolbarContent>
        <ToolbarSearch persistent value="" shouldFilterRows bind:filteredRowIds />
      </ToolbarContent>
    </Toolbar>
  </DataTable>
  <Pagination bind:pageSize bind:page totalItems={filteredRowIds.length} pageSizeInputDisabled />
</Tile>
