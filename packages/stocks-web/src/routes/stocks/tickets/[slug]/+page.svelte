<script lang="ts">
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';
  import Rate from '@/components/Layout/Rate.svelte';
  import Currency from '@/components/Layout/Currency.svelte';
  import type { IndicatorGroup, TicketQuery } from '@pibernetwork/stocks-model/src/types';
  import type { BreadcrumbConfig } from '@/types';

  export let data: { ticket: TicketQuery; indicatorsGroups: IndicatorGroup[] };
  const { ticket, indicatorsGroups } = data;

  const { company } = ticket;
  const { sector, subSector, segment } = company;

  const breadcrumb: BreadcrumbConfig = [
    { key: 'investments' },
    { key: 'stocks' },
    { key: 'sector', slug: sector.slug, label: sector.name },
    { key: 'sub-sector', slug: subSector.slug, label: subSector.name },
    { key: 'segment', slug: segment.slug, label: segment.name },
    { key: 'company', slug: company.slug, label: company.name },
    { key: 'ticket', slug: ticket.slug, label: ticket.name }
  ];
</script>

<svelte:head>
  <title>Ticket - {ticket.name}</title>
</svelte:head>

<Breadcrumb config={breadcrumb} />
<h1>Ticket {ticket.name}</h1>

{#each indicatorsGroups as indicatorGroup}
  <div>
    <div>{indicatorGroup.name}</div>
    <div>
      {#each indicatorGroup.indicators as indicator}
        <div>
          <div>{indicator.label}</div>
          <div>{ticket[indicator.key]}</div>
        </div>
      {/each}
    </div>
  </div>
{/each}

{JSON.stringify(indicatorsGroups)}
<div>
  <h2>{ticket.company.name}</h2>
</div>
<div>
  <Currency value={ticket.currentPrice} />
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
    <Currency value={ticket.income.range.averageAmount} />
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
