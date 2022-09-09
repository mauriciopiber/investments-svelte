<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
  import Income from '@/components/Stocks/Income.svelte';

  import type { SubSectorQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { subSectors: SubSectorQuery[] };
  const { subSectors } = data;
</script>

<Breadcrumb noTrailingSlash>
  <BreadcrumbItem href="/">Investments</BreadcrumbItem>
  <BreadcrumbItem href="/stocks">Stocks</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/sectors">Sectors</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/sub-sectors" isCurrentPage>Sub Sectors</BreadcrumbItem>
</Breadcrumb>
<h1>Sub sectors</h1>
{#each subSectors as subSector}
  <div>
    <a href="/stocks/sub-sectors/{subSector.slug}">{subSector.name}</a>
    <Income
      averageIncome={subSector.income.averageAmount}
      averageYield={subSector.income.averageYield}
    />
  </div>
{/each}
