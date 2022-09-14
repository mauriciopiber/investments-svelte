<script lang="ts">
  import type { Filter } from '@pibernetwork/stocks-model/src/types';
  import MultiRangeSlider from '@/components/Form/MultiRangeSlider.svelte';

  export let data: { filters: Filter[] };
  const { filters } = data;
</script>

<div class="grid grid-cols-4">
  {#each filters as filter}
    <div class="m-4 border-2 border-black border-solid rounded-md">
      <div>
        <div>
          <div class="m-2 text-sm overflow-hidden text-center">
            {filter.key}
          </div>
        </div>
        <div>
          <MultiRangeSlider max={filter.range.max} min={filter.range.min} />
          <!-- <div>{filter.range.min}</div>
          <div>{filter.range.max}</div> -->
        </div>
      </div>
    </div>
  {/each}
</div>
