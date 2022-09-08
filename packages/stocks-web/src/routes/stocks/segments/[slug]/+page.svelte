<script lang="ts">
  import type { SegmentQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { segment: SegmentQuery };
  const { segment } = data;
</script>

<h1>Segment {segment.name}</h1>

<h2>Companies</h2>
{#each segment.companies as company}
  <div>
    <a href="/stocks/companies/{company.slug}">{company.name}</a>
  </div>
{/each}
