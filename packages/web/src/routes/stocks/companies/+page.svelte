<script lang="ts">
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';
  import DataTable from '@/components/DataTable/DataTable.svelte';
  import type { BreadcrumbConfig, Header, Rows } from '@/types';

  import type { CompanyQuery } from '@pibernetwork/model/src/types';
  export let data: { companies: CompanyQuery[] };
  const { companies } = data;

  const breadcrumb: BreadcrumbConfig = [
    { key: 'investments' },
    { key: 'stocks' },
    { key: 'sectors' },
    { key: 'sub-sectors' },
    { key: 'segments' },
    { key: 'companies' }
  ];

  const headers: Header = [
    {
      key: 'company',
      label: 'Company',
      type: 'link'
    },
    {
      key: 'averageAmount',
      label: 'Average Amount',
      type: 'currency'
    },
    {
      key: 'averageYield',
      label: 'Average Yield',
      type: 'rate'
    }
  ];

  const rows: Rows = companies.map((company) => {
    return {
      company: { value: company.name, href: `/stocks/companies/${company.slug}` },
      averageAmount: company.income.averageAmount,
      averageYield: company.income.averageYield
    };
  });
</script>

<svelte:head>
  <title>Companies</title>
</svelte:head>

<Breadcrumb config={breadcrumb} />
<DataTable {headers} {rows} />
