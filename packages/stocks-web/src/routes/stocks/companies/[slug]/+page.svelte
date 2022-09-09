<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
  import type { CompanyQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { company: CompanyQuery };
  const { company } = data;
</script>

<h1>Company {company.name}</h1>

<h2>Tickets</h2>
{#each company.tickets as ticket}
  <div>
    <a href="/stocks/tickets/{ticket.slug}">{ticket.name}</a>
  </div>
{/each}
