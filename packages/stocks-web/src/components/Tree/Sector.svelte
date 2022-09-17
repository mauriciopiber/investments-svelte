<script lang="ts">
  import type { SectorQuery } from '@pibernetwork/stocks-model/src/types';
  import Income from '@/components/Stocks/Income.svelte';
  import SubSector from './SubSector.svelte';
  export let sector: SectorQuery;

  const { subSectors, name, slug, income } = sector;

  let isOpen = false;
  function toggle() {
    isOpen = !isOpen;
  }
</script>

<div class="bg-cyan-300">
  <div class="flex">
    <div>
      <a href={`/stocks/sectors/${slug}`}>{name}</a>
    </div>
    <Income averageIncome={income.averageAmount} averageYield={income.averageYield} />
    <div class="ml-6" on:click={toggle}>{(isOpen && 'Close companies') || 'Open companies'}</div>
  </div>

  <div class="grid" class:hidden={!isOpen}>
    {#each subSectors as subSector}
      <SubSector {subSector} />
    {/each}
  </div>
</div>
