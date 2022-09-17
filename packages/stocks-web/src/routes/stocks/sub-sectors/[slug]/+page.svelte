<script lang="ts">
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';
  import DataTable from '@/components/DataTable/DataTable.svelte';
  import type { BreadcrumbConfig, Header, Rows } from '@/types';

  import type { SubSectorQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { subSector: SubSectorQuery };
  const { subSector } = data;

  const breadcrumb: BreadcrumbConfig = [
    { key: 'investments' },
    { key: 'stocks' },
    { key: 'sector', slug: subSector.sector.slug, label: subSector.sector.name },
    { key: 'sub-sector', slug: subSector.slug, label: subSector.name }
  ];

  const headers: Header = [
    {
      key: 'segment',
      label: 'Segment',
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
    // {
    //   key: 'subSector',
    //   label: 'Sub Sector',
    //   type: 'link'
    // },
    // {
    //   key: 'sector',
    //   label: 'Sector',
    //   type: 'link'
    // }
  ];

  const rows: Rows = subSector.segments.map((segment) => {
    // const { subSector } = segment;

    // const { sector } = subSector;

    return {
      // subSector: { value: subSector.name, href: `/stocks/sub-sectors/${subSector.slug}` },
      // sector: { value: sector.name, href: `/stocks/sectors/${sector.slug}` },
      segment: { value: segment.name, href: `/stocks/segments/${segment.slug}` },
      averageAmount: segment.income.averageAmount,
      averageYield: segment.income.averageYield
    };
  });
</script>

<svelte:head>
  <title>Sub Sector - {subSector.name}</title>
</svelte:head>

<Breadcrumb config={breadcrumb} />

<DataTable {headers} {rows} />
