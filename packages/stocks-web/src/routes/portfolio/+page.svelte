<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbItem,
    DataTable,
    Pagination,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Link
  } from 'carbon-components-svelte';

  import Rate from '@/components/Layout/Rate.svelte';
  import Currency from '@/components/Layout/Currency.svelte';
  import type { PortfolioQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { portfolios: PortfolioQuery[] };
  const { portfolios } = data;

  let pageSize = 25;
  let page = 1;
  let filteredRowIds: string[] = [];
  const headers = [
    {
      key: 'name',
      value: 'Name'
    },
    {
      key: 'price',
      value: 'Price'
    },
    {
      key: 'current',
      value: 'Current'
    },
    {
      key: 'currentAmount',
      value: 'Current Amount'
    },
    {
      key: 'objective',
      value: 'Objective'
    },
    {
      key: 'objectiveMissing',
      value: 'Objective Missing'
    },
    {
      key: 'objectiveAmount',
      value: 'Objective Amount'
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
    }
  ];

  const rows = portfolios.map((portfolio) => {
    const { ticket, current, objective } = portfolio;

    const objectiveMissing = objective - current;
    return {
      id: ticket.name,
      name: ticket.name,
      current,
      price: ticket.price,
      currentAmount: current * ticket.price,
      objective,
      objectiveMissing,
      objectiveAmount: objectiveMissing * ticket.price,
      company: ticket.company,
      segment: ticket.company.segment,
      sector: ticket.company.sector,
      subSector: ticket.company.subSector
    };
  });
</script>

<Breadcrumb noTrailingSlash>
  <BreadcrumbItem href="/">Investments</BreadcrumbItem>
  <BreadcrumbItem href="/portfolio" isCurrentPage>Portfolio</BreadcrumbItem>
</Breadcrumb>

<DataTable sortable size="short" {headers} {rows} {pageSize} {page}>
  <svelte:fragment slot="cell" let:cell>
    {#if cell.key === 'price' || cell.key === 'currentAmount' || cell.key === 'objectiveAmount'}
      <Currency value={cell.value} />
    {:else if cell.key === 'company'}
      <Link href={`/stocks/companies/${cell.value.slug}`}
        ><span class="link">{cell.value.name}</span><Rate
          value={cell.value.income.averageYield}
        /></Link
      >
    {:else if cell.key === 'sector'}
      <Link href={`/stocks/sectors/${cell.value.slug}`}
        ><span class="link">{cell.value.name}</span><Rate
          value={cell.value.income.averageYield}
        /></Link
      >
    {:else if cell.key === 'subSector'}
      <Link href={`/stocks/sub-sectors/${cell.value.slug}`}
        ><span class="link">{cell.value.name}</span><Rate
          value={cell.value.income.averageYield}
        /></Link
      >
    {:else if cell.key === 'segment'}
      <Link href={`/stocks/segments/${cell.value.slug}`}
        ><span class="link">{cell.value.name}</span><Rate
          value={cell.value.income.averageYield}
        /></Link
      >
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

<style>
  .link {
    margin-right: 0.5rem;
  }
</style>
