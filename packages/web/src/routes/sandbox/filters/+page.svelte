<script lang="ts">
  import type { Filter, TicketFilterTypes } from '@pibernetwork/model/src/types';
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

      console.log(key, value);

      const formInput = key.split('_');

      const ticketKey = formInput[0] as TicketFilterTypes;
      const rangeKey = formInput[1] as 'min' | 'max' | 'nullable';

      const rangeItem = data.find((item: Filter) => item.key === ticketKey);

      const numberValue = parseFloat(value as string);

      if (rangeItem) {
        if (rangeKey === 'nullable') {
          rangeItem.range['nullable'] = true;
        }
        if (rangeKey === 'min') {
          rangeItem.range['min'] = numberValue;
        }
        if (rangeKey === 'max') {
          rangeItem.range['max'] = numberValue;
        }
        continue;
      }

      data.push({
        key: ticketKey,
        range: {
          min: rangeKey === 'min' ? numberValue : 0,
          max: rangeKey === 'max' ? numberValue : 0,
          nullable: rangeKey === 'nullable' ? true : false,
        },
      });
    }

    console.log(data);
    search = data;
  }

  let excludeFilters = ['intrinsicRate', 'intrinsicValue', 'participacaoIbov'];
</script>

<div class="flex items-start">
  <form on:submit|preventDefault={handleOnSubmit}>
    <button type="submit">Submit</button>
    <div class="grid grid-cols-2">
      {#each filters as filter}
        {#if !excludeFilters.includes(filter.key)}
          <div class="m-4 border-2 border-black border-solid rounded-md">
            <MultiRangeSlider name={filter.key} max={filter.range.max} min={filter.range.min} />
          </div>
        {/if}
      {/each}
    </div>
  </form>

  <div>
    <h2>Tickets</h2>
    <Tickets {search} />
  </div>
</div>
