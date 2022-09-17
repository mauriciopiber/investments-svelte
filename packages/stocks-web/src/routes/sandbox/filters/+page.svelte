<script lang="ts">
  import type { Filter, TicketFilterTypes } from '@pibernetwork/stocks-model/src/types';
  import MultiRangeSlider from '@/components/Form/MultiRangeSlider.svelte';
  import Tickets from '@/components/Search/Tickets.svelte';

  export let data: { filters: Filter[] };
  const { filters } = data;

  let search: Filter[] = [];

  function handleOnSubmit(event: Event) {
    const { target } = event;
    if (!target) {
      return;
    }

    const formData = new FormData(target as HTMLFormElement);

    const data: Filter[] = [];
    for (let field of formData) {
      const [key, value] = field;

      const formInput = key.split('_');

      const ticketKey = formInput[0] as TicketFilterTypes;
      const rangeKey = formInput[1] as 'min' | 'max';

      const rangeItem = data.find((item: Filter) => item.key === ticketKey);

      const numberValue = parseFloat(value as string);

      if (rangeItem) {
        rangeItem.range[rangeKey] = numberValue;
        continue;
      }

      data.push({
        key: ticketKey,
        range: {
          min: rangeKey === 'min' ? numberValue : 0,
          max: rangeKey === 'max' ? numberValue : 0
        }
      });
    }

    search = data;
  }

  let testFilters = ['currentPrice', 'freeFloat'];
</script>

<div class="flex items-start">
  <form class="grid grid-cols-1 lg:grid-cols-4" on:submit|preventDefault={handleOnSubmit}>
    <button type="submit">Submit</button>
    {#each filters as filter}
      {#if testFilters.includes(filter.key)}
        <div class="m-4 border-2 border-black border-solid rounded-md">
          <div>
            <div>
              <div class="m-2 text-sm overflow-hidden text-center">
                {filter.key}
              </div>
            </div>
            <div>
              <MultiRangeSlider name={filter.key} max={filter.range.max} min={filter.range.min} />
            </div>
          </div>
        </div>
      {/if}
    {/each}
  </form>

  <div>
    <h2>Tickets</h2>
    <Tickets {search} />
  </div>
</div>
