<script lang="ts">
  import type * as Types from '@global/types';

  export let data: {
    stocks: Types.Stock[];
    sectors: string[];
    subSectors: string[];
    segments: string[];
  };

  const { stocks, sectors, subSectors, segments } = data;
</script>

<div>
  {#each sectors as sector}
    <div>{sector}</div>
  {/each}
  {#each subSectors as subSector}
    <div>{subSector}</div>
  {/each}
  {#each segments as segment}
    <div>{segment}</div>
  {/each}
  <!-- {#each stocks as stock}
		<div>{stock.ticket}</div>
		<div>{stock.price}</div>
	{/each} -->
</div>
