<script lang="ts">
  import type { SubSectorQuery } from '@pibernetwork/stocks-model/src/types';
  import Segment from './Segment.svelte';
  import Income from '@/components/Stocks/Income.svelte';
  export let subSector: SubSectorQuery;

  const { segments, name, slug, income } = subSector;

  let isOpen = false;
  function toggle() {
    isOpen = !isOpen;
  }
</script>

<div class="bg-lime-300">
  <div class="flex">
    <div>
      <a href={`/stocks/sub-sectors/${slug}`}>{name}</a>
    </div>
    <Income averageIncome={income.averageAmount} averageYield={income.averageYield} />
    <div class="ml-6" on:click={toggle}>{(isOpen && 'Close companies') || 'Open companies'}</div>
  </div>

  <div class="grid" class:hidden={!isOpen}>
    {#each segments as segment}
      <Segment {segment} />
    {/each}
  </div>
</div>
