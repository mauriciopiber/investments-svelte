<script lang="ts">
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';
  import DataTable from '@/components/DataTable/DataTable.svelte';
  import type { BreadcrumbConfig, Header, Rows } from '@/types';

  import type { SubSectorQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { subSectors: SubSectorQuery[] };
  const { subSectors } = data;

  const breadcrumb: BreadcrumbConfig = [
    { key: 'investments' },
    { key: 'stocks' },
    { key: 'sectors' },
    { key: 'sub-sectors' }
  ];

  const headers: Header = [
    {
      key: 'subSector',
      label: 'Sub Sector',
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
    },
    {
      key: 'sector',
      label: 'Sector',
      type: 'link'
    }
  ];

  const rows: Rows = subSectors.map((subSector) => {
    return {
      subSector: { value: subSector.name, href: `/stocks/sub-sectors/${subSector.slug}` },
      sector: { value: subSector.sector.name, href: `/stocks/sectors/${subSector.sector.slug}` },

      averageAmount: subSector.income.averageAmount,
      averageYield: subSector.income.averageYield
    };
  });
</script>

<svelte:head>
  <title>Sub Sectors</title>
</svelte:head>

<Breadcrumb config={breadcrumb} />

<DataTable {headers} {rows} />
