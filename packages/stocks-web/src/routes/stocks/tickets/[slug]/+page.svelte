<script lang="ts">
  import type { TicketQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { ticket: TicketQuery };
  const { ticket } = data;
</script>

<h1>Ticket {ticket.name}</h1>
