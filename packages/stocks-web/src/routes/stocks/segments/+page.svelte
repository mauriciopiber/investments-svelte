<script lang="ts">
  import Income from '@/components/Stocks/Income.svelte';

  import type { SegmentQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { segments: SegmentQuery[] };
  const { segments } = data;
</script>

<h1>Segments</h1>
{#each segments as segment}
  <div>
    <a href="/stocks/segments/{segment.slug}">{segment.name}</a>
    <Income
      averageIncome={segment.income.averageAmount}
      averageYield={segment.income.averageYield}
    />
  </div>
{/each}
