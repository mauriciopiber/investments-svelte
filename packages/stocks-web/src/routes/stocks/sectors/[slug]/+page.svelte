<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
  import type { SectorQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { sector: SectorQuery };
  const { sector } = data;
</script>

<Breadcrumb noTrailingSlash>
  <BreadcrumbItem href="/">Investments</BreadcrumbItem>
  <BreadcrumbItem href="/stocks">Stocks</BreadcrumbItem>
  <BreadcrumbItem href={`/stocks/sectors/${sector.slug}`} isCurrentPage
    >{sector.name}</BreadcrumbItem
  >
</Breadcrumb>
<h1>Sector {sector.name}</h1>

<h2>Sub sectors</h2>
{#each sector.subSectors as subSector}
  <div>
    <a href="/stocks/sub-sectors/{subSector.slug}">{subSector.name}</a>
  </div>
{/each}
