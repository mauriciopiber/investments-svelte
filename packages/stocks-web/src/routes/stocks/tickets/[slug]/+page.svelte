<script lang="ts">
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';
  import type { IndicatorGroup, TicketQuery } from '@pibernetwork/stocks-model/src/types';
  import type { BreadcrumbConfig } from '@/types';

  export let data: { ticket: TicketQuery; indicatorsGroups: IndicatorGroup[] };
  const { ticket, indicatorsGroups } = data;

  const { company, income } = ticket;
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

<div class={`grid grid-cols-9`}>
  {#each indicatorsGroups as indicatorGroup}
    <div class="m-4">
      <div class="text-3xl">{indicatorGroup.name}</div>

      <div class="flex flex-col">
        {#each indicatorGroup.indicators as indicator}
          <div class="m-1">
            <div>{indicator.label}</div>
            <div>{ticket[indicator.key]}</div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
  <div class="m-4">
    <div class="text-3xl">Dividends</div>
    <div>
      <div>Range</div>
      <div>{income.rangeInYears} years</div>
    </div>
    <div>
      <div>Income Total</div>
      <div>{income.incomeTotal}</div>
    </div>
    <div>
      <div>Income Yield</div>
      <div>{income.incomeYield}</div>
    </div>
    <div>
      <div>Range Average</div>
      <div>{income.range.averageAmount}</div>
    </div>
    <div>
      <div>Range Yield</div>
      <div>{income.range.averageYield}</div>
    </div>
    <div>
      <div>Dividends Average</div>
      <div>{income.dividends.averageAmount}</div>
    </div>
    <div>
      <div>Dividends Yield</div>
      <div>{income.dividends.averageYield}</div>
    </div>
    <div>
      <div>JCP Average</div>
      <div>{income.interest.averageAmount}</div>
    </div>
    <div>
      <div>JCP Yield</div>
      <div>{income.interest.averageYield}</div>
    </div>
    <div>
      <div>Others Average</div>
      <div>{income.interest.averageAmount}</div>
    </div>
    <div>
      <div>Others Yield</div>
      <div>{income.interest.averageYield}</div>
    </div>
  </div>
</div>

<!--
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
</div> -->
<style>
  .income {
    display: flex;
  }

  .income__item {
    padding: 2rem;
  }
</style>
