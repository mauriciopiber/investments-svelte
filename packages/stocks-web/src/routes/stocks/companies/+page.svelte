<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
  import Income from '@/components/Stocks/Income.svelte';

  import type { CompanyQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { companies: CompanyQuery[] };
  const { companies } = data;
</script>

<Breadcrumb noTrailingSlash>
  <BreadcrumbItem href="/">Investments</BreadcrumbItem>
  <BreadcrumbItem href="/stocks">Stocks</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/sectors">Sectors</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/sub-sectors">Sub Sectors</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/segments">Segments</BreadcrumbItem>
  <BreadcrumbItem href="/stocks/companies" isCurrentPage>Companies</BreadcrumbItem>
</Breadcrumb>

<h1>Companies</h1>
{#each companies as company}
  <div>
    <a href="/stocks/companies/{company.slug}">{company.name}</a>
    <Income
      averageIncome={company.income.averageAmount}
      averageYield={company.income.averageYield}
    />
  </div>
{/each}
