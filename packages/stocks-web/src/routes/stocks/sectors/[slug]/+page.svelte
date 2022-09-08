<script lang="ts">
  import type { SectorQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { sector: SectorQuery };
  const { sector } = data;
</script>

<h1>Sector {sector.name}</h1>

<h2>Sub sectors</h2>
{#each sector.subSectors as subSector}
  <div>
    <a href="/stocks/sub-sectors/{subSector.slug}">{subSector.name}</a>
  </div>
{/each}
