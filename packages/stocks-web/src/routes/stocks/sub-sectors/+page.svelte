<script lang="ts">
  import Income from '@/components/Stocks/Income.svelte';

  import type { SubSectorQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { subSectors: SubSectorQuery[] };
  const { subSectors } = data;
</script>

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
