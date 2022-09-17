<script lang="ts">
  import Rate from '@/components/Layout/Rate.svelte';
  import Currency from '@/components/Layout/Currency.svelte';
  import type { RowCell, HeaderItemType, RowLink } from '@/types';

  export let cell: RowCell;
  export let type: HeaderItemType | undefined;

  let valueText: string;
  let valueNumber: number;
  let valueLink: RowLink;

  switch (type) {
    case 'currency':
      valueNumber = cell as number;
      break;
    case 'rate':
      valueNumber = cell as number;
      break;
    case 'link':
      valueLink = cell as RowLink;
      break;
    default:
      valueText = cell as string;
  }
</script>

<td class="border-grey-light border hover:bg-gray-100 p-3 h-12">
  {#if type === 'rate'}
    <Rate value={valueNumber} />
  {:else if type === 'currency'}
    <Currency value={valueNumber} />
  {:else if type === 'link'}
    <a href={valueLink.href}>{valueLink.value}</a>
  {:else}
    {valueText}
  {/if}
</td>
