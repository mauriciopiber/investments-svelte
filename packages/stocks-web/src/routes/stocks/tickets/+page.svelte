<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
  import Income from '@/components/Stocks/Income.svelte';

  import type { TicketQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { tickets: TicketQuery[] };
  const { tickets } = data;
</script>

<h1>Tickets</h1>
{#each tickets as ticket}
  <div>
    <a href="/stocks/tickets/{ticket.slug}">{ticket.name}</a>
    <Income
      averageIncome={ticket.income.range.averageIncome}
      averageYield={ticket.income.range.averageYield}
    />
  </div>
{/each}
