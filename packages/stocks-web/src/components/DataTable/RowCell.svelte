<script lang="ts">
  import type { RowCell, HeaderItemType, RowLink } from '@/types';

  export let cell: RowCell;
  export let type: HeaderItemType | undefined;

  let valueText: string;
  let valueLink: RowLink;

  switch (type) {
    case 'link':
      valueLink = cell as RowLink;
      break;
    default:
      valueText = cell as string;
  }
</script>

<td class="border-grey-light border hover:bg-gray-100 p-3 h-12">
  {#if type === 'link'}
    <a href={valueLink.href}>{valueLink.value}</a>
  {:else}
    {valueText}
  {/if}
</td>
