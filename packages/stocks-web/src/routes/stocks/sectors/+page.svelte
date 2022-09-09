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
  import CenterCircle from 'carbon-icons-svelte/lib/CenterCircle.svelte';
  import type { SectorQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { sectors: SectorQuery[] };
  const { sectors } = data;

  let pageSize = 25;
  let page = 1;
  let filteredRowIds: string[] = [];
  const headers = [
    {
      key: 'slug',
      value: ''
    },
    {
      key: 'name',
      value: 'Name'
    },
    {
      key: 'subSectors',
      value: '# SubSector'
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

  const rows = sectors.map((sector) => {
    return {
      id: sector.slug,
      name: sector.name,
      slug: sector.slug,
      subSectors: sector.subSectors.length,
      averageAmount: sector.income.averageAmount,
      averageYield: sector.income.averageYield
    };
  });
</script>

<Breadcrumb noTrailingSlash>
  <BreadcrumbItem href="/">Investments</BreadcrumbItem>
  <BreadcrumbItem href="/stocks">Stocks</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/sectors" isCurrentPage>Sectors</BreadcrumbItem>
</Breadcrumb>

<h1>Sectors</h1>
<DataTable sortable size="short" {headers} {rows} {pageSize} {page}>
  <svelte:fragment slot="cell" let:cell>
    {#if cell.key === 'averageAmount'}
      <Currency value={cell.value} />
    {:else if cell.key === 'averageYield'}
      <Rate value={cell.value} />
    {:else if cell.key === 'slug'}
      <Link href={`/stocks/sectors/${cell.value}`}><CenterCircle size={20} /></Link>
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
