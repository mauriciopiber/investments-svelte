<script lang="ts">
  import type { TicketQuery } from '@pibernetwork/stocks-model/src/types';

  export let ticket: TicketQuery;
</script>

<div class="flex bg-rose-200 p-4 m-2 rounded-lg">
  <a href={`/stocks/ticket/${ticket.slug}`}>{ticket.name}</a>
  <div class="flex">
    <div class="mx-1">
      {ticket.income.range.averageAmount}
    </div>
    <div class="mx-1">
      {ticket.income.range.averageYield}
    </div>
  </div>
</div>
