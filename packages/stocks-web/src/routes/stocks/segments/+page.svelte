<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
  import Income from '@/components/Stocks/Income.svelte';

  import type { SegmentQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { segments: SegmentQuery[] };
  const { segments } = data;
</script>

<Breadcrumb noTrailingSlash>
  <BreadcrumbItem href="/">Investments</BreadcrumbItem>
  <BreadcrumbItem href="/stocks">Stocks</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/sectors">Sectors</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/sub-sectors">Sub Sectors</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/segments" isCurrentPage>Segments</BreadcrumbItem>
</Breadcrumb>
<h1>Segments</h1>
{#each segments as segment}
  <div>
    <a href="/stocks/segments/{segment.slug}">{segment.name}</a>
    <Income
      averageIncome={segment.income.averageAmount}
      averageYield={segment.income.averageYield}
    />
  </div>
{/each}
