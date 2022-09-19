<script lang="ts">
  import type { SubSectorQuery } from '@pibernetwork/stocks-model/src/types';
  import Segment from './Segment.svelte';
  import Toggle from './Toggle.svelte';
  export let subSector: SubSectorQuery;

  const { segments, name, slug, income } = subSector;

  let isOpen = false;
  function toggle() {
    isOpen = !isOpen;
  }
</script>

<div class="bg-indigo-300 px-4 py-1 my-1 rounded-lg">
  <div class="flex">
    <Toggle {isOpen} on:click={toggle} />
    <div class="ml-4">
      <a href={`/stocks/sub-sectors/${slug}`}>{name}</a>
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
    {#each segments as segment}
      <Segment {segment} />
    {/each}
  </div>
</div>
