<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
  import type { SegmentQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { segment: SegmentQuery };
  const { segment } = data;
</script>

<Breadcrumb noTrailingSlash>
  <BreadcrumbItem href="/">Investments</BreadcrumbItem>
  <BreadcrumbItem href="/stocks">Stocks</BreadcrumbItem>
  <BreadcrumbItem href={`/stocks/sectors/${segment.subSector.sector.slug}`}
    >{segment.subSector.sector.name}</BreadcrumbItem
  >
  <BreadcrumbItem href={`/stocks/sub-sectors/${segment.subSector.slug}`}
    >{segment.subSector.name}</BreadcrumbItem
  >
  <BreadcrumbItem href={`/stocks/segments/${segment.slug}`} isCurrentPage
    >{segment.name}</BreadcrumbItem
  >
</Breadcrumb>
<h1>Segment {segment.name}</h1>

<h2>Companies</h2>
{#each segment.companies as company}
  <div>
    <a href="/stocks/companies/{company.slug}">{company.name}</a>
  </div>
{/each}
