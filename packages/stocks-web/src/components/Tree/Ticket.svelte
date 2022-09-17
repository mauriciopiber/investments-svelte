<script lang="ts">
  import type { TicketQuery } from '@pibernetwork/stocks-model/src/types';
  import Income from '@/components/Stocks/Income.svelte';

  export let ticket: TicketQuery;
</script>

<div class="flex bg-rose-200 p-4 m-2 rounded-lg">
  <a href={`/stocks/ticket/${ticket.slug}`}>{ticket.name}</a>
  <Income
    averageAmount={ticket.income.range.averageAmount}
    averageYield={ticket.income.range.averageYield}
  />
</div>
