<script lang="ts">
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';
  import DataTable from '@/components/DataTable/DataTable.svelte';
  import type { BreadcrumbConfig, Header, Rows } from '@/types';
  import type { SegmentQuery } from '@pibernetwork/model/src/types';
  export let data: { segment: SegmentQuery };
  const { segment } = data;

  const { subSector, companies } = segment;

  const { sector } = subSector;

  const breadcrumb: BreadcrumbConfig = [
    { key: 'investments' },
    { key: 'stocks' },
    { key: 'sector', slug: sector.slug, label: sector.name },
    { key: 'sub-sector', slug: subSector.slug, label: subSector.name },
    { key: 'segment', slug: segment.slug, label: segment.name }
  ];

  const headers: Header = [
    {
      key: 'company',
      label: 'Company',
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

  const rows: Rows = companies.map((company) => {
    return {
      company: { value: company.name, href: `/stocks/companies/${company.slug}` },
      averageAmount: company.income.averageAmount,
      averageYield: company.income.averageYield
    };
  });
</script>

<svelte:head>
  <title>Segment - {segment.name}</title>
</svelte:head>

<Breadcrumb config={breadcrumb} />

<DataTable {headers} {rows} />
