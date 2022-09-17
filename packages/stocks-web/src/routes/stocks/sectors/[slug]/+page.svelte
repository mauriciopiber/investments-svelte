<script lang="ts">
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';
  import DataTable from '@/components/DataTable/DataTable.svelte';
  import type { BreadcrumbConfig, Header, Rows } from '@/types';
  import type { SectorQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { sector: SectorQuery };
  const { sector } = data;

  const breadcrumb: BreadcrumbConfig = [
    { key: 'investments' },
    { key: 'stocks' },
    { key: 'sector', slug: sector.slug, label: sector.name }
  ];

  const headers: Header = [
    {
      label: 'Sub Sector',
      key: 'subSector',
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

  const rows: Rows = sector.subSectors.map((subSector) => {
    return {
      subSector: { value: subSector.name, href: `/stocks/sub-sectors/${subSector.slug}` },
      averageAmount: subSector.income.averageAmount,
      averageYield: subSector.income.averageYield
    };
  });
</script>

<svelte:head>
  <title>Sector - {sector.name}</title>
</svelte:head>

<Breadcrumb config={breadcrumb} />
<DataTable {headers} {rows} />
