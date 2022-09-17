<script lang="ts">
  import Rate from '@/components/Layout/Rate.svelte';
  import Currency from '@/components/Layout/Currency.svelte';
  import type { RowCell } from '@/types';

  export let cell: RowCell;
</script>

<td class="border-grey-light border hover:bg-gray-100 p-3 h-12">
  {#if cell.type === 'rate'}
    <Rate value={cell.value} />
  {:else if cell.type === 'currency'}
    <Currency value={cell.value} />
  {:else if cell.type === 'link'}
    <a href={cell.href}>{cell.value}</a>
  {:else}
    {cell.value}
  {/if}
</td>
