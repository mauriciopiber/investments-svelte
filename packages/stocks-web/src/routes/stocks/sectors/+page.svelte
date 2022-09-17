<script lang="ts">
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';

  import type { SectorQuery } from '@pibernetwork/stocks-model/src/types';
  import type { BreadcrumbConfig, Header, Rows } from '@/types';
  import DataTable from '@/components/DataTable/DataTable.svelte';
  export let data: { sectors: SectorQuery[] };
  const { sectors } = data;

  const headers: Header = [
    {
      key: 'name',
      label: 'Name',
      type: 'link'
    },
    {
      key: 'subSectors',
      label: '# SubSector'
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

  const rows: Rows = sectors.map((sector) => {
    return {
      name: { value: sector.name, href: `/stocks/sectors/${sector.slug}` },
      slug: sector.slug,
      subSectors: sector.subSectors.length,
      averageAmount: sector.income.averageAmount,
      averageYield: sector.income.averageYield
    };
  });

  const breadcrumb: BreadcrumbConfig = [
    { key: 'investments' },
    { key: 'stocks' },
    { key: 'sectors' }
  ];
</script>

<svelte:head>
  <title>Sectors</title>
</svelte:head>

<Breadcrumb config={breadcrumb} />
<DataTable {headers} {rows} />

<!--
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
<Pagination bind:pageSize bind:page totalItems={filteredRowIds.length} pageSizeInputDisabled /> -->
