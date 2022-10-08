<script lang="ts">
  import type { SectorQuery } from '@pibernetwork/model/src/types';

  import SubSector from './SubSector.svelte';
  import Toggle from './Toggle.svelte';

  export let sector: SectorQuery;

  const { subSectors, name, slug, income } = sector;

  let isOpen = false;
  function toggle() {
    isOpen = !isOpen;
  }
</script>

<div class="bg-sky-300 px-4 py-2 m-2 rounded-lg">
  <div class="flex">
    <Toggle {isOpen} on:click={toggle} />
    <div class="ml-4">
      <a href={`/stocks/sectors/${slug}`}>{name}</a>
    </div>
    <div class="flex">
      <div class="mx-1">
        {income.averageAmount}
      </div>
      <div class="mx-1">
        {income.averageYield}
      </div>
    </div>
  </div>

  <div class="grid mt-2" class:hidden={!isOpen}>
    {#each subSectors as subSector}
      <SubSector {subSector} />
    {/each}
  </div>
</div>
