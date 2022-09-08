<script lang="ts">
  import type { SubSectorQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { subSector: SubSectorQuery };
  const { subSector } = data;
</script>

<h1>Sub sector {subSector.name}</h1>

<h2>Segments</h2>
{#each subSector.segments as segment}
  <div>
    <a href="/stocks/segments/{segment.slug}">{segment.name}</a>
  </div>
{/each}
