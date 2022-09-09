<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
  import Rate from '@/components/Layout/Rate.svelte';
  import Currency from '@/components/Layout/Currency.svelte';
  import type { TicketQuery } from '@pibernetwork/stocks-model/src/types';

  export let data: { ticket: TicketQuery };
  const { ticket } = data;
</script>

<Breadcrumb noTrailingSlash>
  <BreadcrumbItem href="/">Investments</BreadcrumbItem>
  <BreadcrumbItem href="/stocks">Stocks</BreadcrumbItem>
  <BreadcrumbItem href={`/stocks/sectors/${ticket.company.sector.slug}`}
    >{ticket.company.sector.name}</BreadcrumbItem
  >
  <BreadcrumbItem href={`/stocks/sub-sectors/${ticket.company.subSector.slug}`}
    >{ticket.company.subSector.name}</BreadcrumbItem
  >
  <BreadcrumbItem href={`/stocks/segments/${ticket.company.segment.slug}`}
    >{ticket.company.segment.name}</BreadcrumbItem
  >
  <BreadcrumbItem href={`/stocks/companies/${ticket.company.slug}`}
    >{ticket.company.name}</BreadcrumbItem
  >
  <BreadcrumbItem href={`/stocks/tickets/${ticket.slug}`} isCurrentPage
    >{ticket.name}</BreadcrumbItem
  >
</Breadcrumb>

<h1>Ticket {ticket.name}</h1>

<div>
  <h2>{ticket.company.name}</h2>
</div>
<div>
  <Currency value={ticket.price} />
</div>
<div class="income">
  <h2>Total provents in {ticket.income.rangeInYears} years</h2>
  <div class="income__item">
    <Currency value={ticket.income.incomeTotal} />
  </div>
  <div class="income__item">
    <Rate value={ticket.income.incomeYield} />
  </div>
</div>
<div class="income">
  <h2>Average yearly provents in {ticket.income.rangeInYears} years</h2>
  <div class="income__item">
    <Currency value={ticket.income.range.averageIncome} />
  </div>
  <div class="income__item">
    <Rate value={ticket.income.range.averageYield} />
  </div>
</div>

<div>
  <h2>{ticket.company.sector.name}</h2>
</div>

<div>
  <h2>{ticket.company.subSector.name}</h2>
</div>
<div>
  <h2>{ticket.company.segment.name}</h2>
</div>

<style>
  .income {
    display: flex;
  }

  .income__item {
    padding: 2rem;
  }
</style>
