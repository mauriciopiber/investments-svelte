<script lang="ts">
  import Sector from '@/components/Tree/Sector.svelte';
  import type { SectorQuery } from '@pibernetwork/stocks-model/src/types';

  export let sectors: SectorQuery[];
</script>

<div class="m-6">
  <h2 class="text-2xl">Stocks</h2>
  <div class="mt-6">
    {#each sectors as sector}
      <Sector {sector} />
    {/each}
  </div>
</div>
