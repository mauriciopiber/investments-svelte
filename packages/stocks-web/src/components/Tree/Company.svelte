<script lang="ts">
  import type { CompanyQuery } from '@pibernetwork/stocks-model/src/types';
  import Ticket from './Ticket.svelte';
  import Income from '@/components/Stocks/Income.svelte';
  export let company: CompanyQuery;

  const { tickets, income } = company;

  let isOpen = false;
  function toggle() {
    isOpen = !isOpen;
  }
</script>

<div class="bg-red-300">
  <div class="flex">
    <div>
      <a href={`/stocks/companies/${company.slug}`}>{company.name}</a>
    </div>
    <Income averageIncome={income.averageAmount} averageYield={income.averageYield} />
    <div class="ml-6" on:click={toggle}>{(isOpen && 'Close tickets') || 'Open Tickets'}</div>
  </div>

  <div class="grid" class:hidden={!isOpen}>
    {#each tickets as ticket}
      <Ticket {ticket} />
    {/each}
  </div>
</div>
