<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
  import Income from '@/components/Stocks/Income.svelte';

  import type { CompanyQuery } from '@pibernetwork/stocks-model/src/types';
  export let data: { companies: CompanyQuery[] };
  const { companies } = data;
</script>

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
