<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
  import Income from '@/components/Stocks/Income.svelte';

  import type { SectorQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { sectors: SectorQuery[] };
  const { sectors } = data;
</script>

<Breadcrumb noTrailingSlash>
  <BreadcrumbItem href="/">Investments</BreadcrumbItem>
  <BreadcrumbItem href="/stocks">Stocks</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/sectors" isCurrentPage>Sectors</BreadcrumbItem>
</Breadcrumb>

<h1>Sectors</h1>
{#each sectors as sector}
  <div>
    <a href="/stocks/sectors/{sector.slug}">{sector.name}</a>
    <Income averageIncome={sector.income.averageAmount} averageYield={sector.income.averageYield} />
  </div>
{/each}
