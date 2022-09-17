<script lang="ts">
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';
  import DataTable from '@/components/DataTable/DataTable.svelte';
  import type { BreadcrumbConfig, Header, Rows } from '@/types';

  import type { SegmentQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { segments: SegmentQuery[] };
  const { segments } = data;

  const breadcrumb: BreadcrumbConfig = [
    { key: 'investments' },
    { key: 'stocks' },
    { key: 'sectors' },
    { key: 'sub-sectors' },
    { key: 'segments' }
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
  ];

  const rows: Rows = segments.map((segment) => {
    return {
      segment: { value: segment.name, href: `/stocks/segments/${segment.slug}` },
      averageAmount: segment.income.averageAmount,
      averageYield: segment.income.averageYield
    };
  });
</script>

<Breadcrumb config={breadcrumb} />
<DataTable {headers} {rows} />
