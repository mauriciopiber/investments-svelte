<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
  import Income from '@/components/Stocks/Income.svelte';

  import type { TicketQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { tickets: TicketQuery[] };
  const { tickets } = data;
</script>

<Breadcrumb noTrailingSlash>
  <BreadcrumbItem href="/">Investments</BreadcrumbItem>
  <BreadcrumbItem href="/stocks">Stocks</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/sectors">Sectors</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/sub-sectors">Sub Sectors</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/segments">Segments</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/companies">Companies</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/tickets" isCurrentPage>Tickets</BreadcrumbItem>
</Breadcrumb>
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
