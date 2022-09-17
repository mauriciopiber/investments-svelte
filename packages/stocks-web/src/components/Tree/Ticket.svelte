<script lang="ts">
  import type { TicketQuery } from '@pibernetwork/stocks-model/src/types';
  import Income from '@/components/Stocks/Income.svelte';

  export let ticket: TicketQuery;
</script>

<div class="flex bg-rose-200">
  <a href={`/stocks/ticket/${ticket.slug}`}>{ticket.name}</a>
  <Income
    averageIncome={ticket.income.range.averageIncome}
    averageYield={ticket.income.range.averageYield}
  />
</div>
