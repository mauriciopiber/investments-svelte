<script lang="ts">
  import type { SegmentQuery } from '@pibernetwork/stocks-model/src/types';
  import Company from './Company.svelte';
  import Income from '@/components/Stocks/Income.svelte';
  export let segment: SegmentQuery;

  const { companies, name, slug, income } = segment;

  let isOpen = false;
  function toggle() {
    isOpen = !isOpen;
  }
</script>

<div class="bg-orange-200">
  <div class="flex">
    <div>
      <a href={`/stocks/segments/${slug}`}>{name}</a>
    </div>
    <Income averageIncome={income.averageAmount} averageYield={income.averageYield} />
    <div class="ml-6" on:click={toggle}>{(isOpen && 'Close companies') || 'Open companies'}</div>
  </div>

  <div class="grid" class:hidden={!isOpen}>
    {#each companies as company}
      <Company {company} />
    {/each}
  </div>
</div>
