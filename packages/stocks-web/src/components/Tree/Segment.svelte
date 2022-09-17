<script lang="ts">
  import type { SegmentQuery } from '@pibernetwork/stocks-model/src/types';
  import Company from './Company.svelte';
  import Income from '@/components/Stocks/Income.svelte';
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
    <Income averageIncome={income.averageAmount} averageYield={income.averageYield} />
  </div>

  <div class="grid" class:hidden={!isOpen}>
    {#each companies as company}
      <Company {company} />
    {/each}
  </div>
</div>
