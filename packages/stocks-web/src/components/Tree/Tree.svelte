<script lang="ts">
  import Sector from '@/components/Tree/Sector.svelte';
  import type { SectorQuery } from '@pibernetwork/stocks-model/src/types';

  export let sectors: SectorQuery[];
</script>

{#each sectors as sector}
  <Sector {sector} />
{/each}
