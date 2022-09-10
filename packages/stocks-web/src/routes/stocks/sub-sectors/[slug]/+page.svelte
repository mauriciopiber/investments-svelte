<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
  import type { SubSectorQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { subSector: SubSectorQuery };
  const { subSector } = data;
</script>

<Breadcrumb noTrailingSlash>
  <BreadcrumbItem href="/">Investments</BreadcrumbItem>
  <BreadcrumbItem href="/stocks">Stocks</BreadcrumbItem>
  <BreadcrumbItem href={`/stocks/sectors/${subSector.sector.slug}`}
    >{subSector.sector.name}</BreadcrumbItem
  >
  <BreadcrumbItem href={`/stocks/sub-sectors/${subSector.slug}`} isCurrentPage
    >{subSector.name}</BreadcrumbItem
  >
</Breadcrumb>
<h1>Sub sector {subSector.name}</h1>

<h2>Segments</h2>
{#each subSector.segments as segment}
  <div>
    <a href="/stocks/segments/{segment.slug}">{segment.name}</a>
  </div>
{/each}
