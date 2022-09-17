<script lang="ts">
  import type { Header, Row } from '@/types';
  import RowCell from './RowCell.svelte';

  export let headers: Header[];
  export let rows: Row[];
</script>

<table
  class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5"
>
  <thead class="text-white">
    {#each rows as _}
      <tr
        class="bg-red-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
      >
        {#each headers as { value }}
          <th class="p-3 text-left h-12 text-ellipsis overflow-hidden whitespace-nowrap">{value}</th
          >
        {/each}
      </tr>
    {/each}
  </thead>
  <tbody class="flex-1 sm:flex-none">
    {#each rows as row}
      <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 ">
        {#each headers as { key }}
          <RowCell cell={row[key]} />
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  @media (min-width: 640px) {
    table {
      display: inline-table !important;
    }

    thead tr:not(:first-child) {
      display: none;
    }
  }

  th:not(:last-child) {
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
</style>
