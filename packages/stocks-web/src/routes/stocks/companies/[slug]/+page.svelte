<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
  import type { CompanyQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { company: CompanyQuery };
  const { company } = data;
</script>

<Breadcrumb noTrailingSlash>
  <BreadcrumbItem href="/">Investments</BreadcrumbItem>
  <BreadcrumbItem href="/stocks">Stocks</BreadcrumbItem>
  <BreadcrumbItem href={`/stocks/sectors/${company.sector.slug}`}
    >{company.sector.name}</BreadcrumbItem
  >
  <BreadcrumbItem href={`/stocks/sub-sectors/${company.subSector.slug}`}
    >{company.subSector.name}</BreadcrumbItem
  >
  <BreadcrumbItem href={`/stocks/segments/${company.segment.slug}`}
    >{company.segment.name}</BreadcrumbItem
  >
  <BreadcrumbItem href={`/stocks/companies/${company.slug}`} isCurrentPage
    >{company.name}</BreadcrumbItem
  >
</Breadcrumb>
<h1>Company {company.name}</h1>

<h2>Tickets</h2>
{#each company.tickets as ticket}
  <div>
    <a href="/stocks/tickets/{ticket.slug}">{ticket.name}</a>
  </div>
{/each}
