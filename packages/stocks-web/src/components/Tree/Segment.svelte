<script lang="ts">
  import type { SegmentQuery } from '@pibernetwork/stocks-model/src/types';
  import Company from './Company.svelte';

  import Toggle from './Toggle.svelte';
  export let segment: SegmentQuery;

  const { companies, name, slug, income } = segment;

  let isOpen = false;
  function toggle() {
    isOpen = !isOpen;
  }
</script>

<div class="bg-orange-200 px-4 py-1 my-1 rounded-lg">
  <div class="flex">
    <Toggle {isOpen} on:click={toggle} />
    <div class="ml-4">
      <a href={`/stocks/segments/${slug}`}>{name}</a>
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

  <div class="grid" class:hidden={!isOpen}>
    {#each companies as company}
      <Company {company} />
    {/each}
  </div>
</div>
