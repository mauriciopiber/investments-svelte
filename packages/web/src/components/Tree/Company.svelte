<script lang="ts">
  import type { CompanyQuery } from '@pibernetwork/model/src/types';
  import Ticket from './Ticket.svelte';
  import Toggle from './Toggle.svelte';
  export let company: CompanyQuery;

  const { tickets, income } = company;

  let isOpen = false;
  function toggle() {
    isOpen = !isOpen;
  }
</script>

<div class="bg-red-300 my-1 px-4 py-1 rounded-lg">
  <div class="flex">
    <Toggle {isOpen} on:click={toggle} />
    <div class="mx-2">
      <a href={`/stocks/companies/${company.slug}`}>{company.name}</a>
    </div>
    <div class="flex">
      <div class="mx-1">
        {income.averageAmount}
      </div>
      <div class="mx-1">
        {income.averageYield}
      </div>
    </div>
  </div>

  <div class="grid" class:hidden={!isOpen}>
    {#each tickets as ticket}
      <Ticket {ticket} />
    {/each}
  </div>
</div>
