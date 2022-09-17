<script lang="ts">
  import type { TicketQuery } from '@pibernetwork/stocks-model/src/types';
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';
  import DataTable from '@/components/DataTable/DataTable.svelte';
  import type { Header, Row } from '@/types';
  export let data: { tickets: TicketQuery[] };
  const { tickets } = data;

  const headers: Header[] = [
    {
      key: 'name',
      value: 'Name'
    },
    {
      key: 'company',
      value: 'Company'
    },
    {
      key: 'sector',
      value: 'Sector'
    },
    {
      key: 'subSector',
      value: 'Sub Sector'
    },
    {
      key: 'segment',
      value: 'Segment'
    },
    {
      key: 'price',
      value: 'Price'
    },
    {
      key: 'averageAmount',
      value: 'Average Amount'
    },
    {
      key: 'averageYield',
      value: 'Average Yield'
    }
  ];

  const rows: Row[] = tickets.map((ticket) => {
    return {
      id: { value: ticket.slug },
      name: { value: ticket.name },

      sector: {
        value: ticket.company.sector.name,
        href: `/stocks/sectors/${ticket.company.sector.slug}`,
        type: 'link'
      },
      subSector: {
        value: ticket.company.subSector.name,
        href: `/stocks/sub-sectors/${ticket.company.subSector.slug}`,
        type: 'link'
      },
      segment: {
        value: ticket.company.segment.name,
        href: `/stocks/segments/${ticket.company.segment.slug}`,
        type: 'link'
      },
      company: {
        type: 'link',
        href: `/stocks/companies/${ticket.company.slug}`,
        value: ticket.company.name
      },

      averageAmount: { value: ticket.income.range.averageIncome, type: 'currency' },
      averageYield: { value: ticket.income.range.averageYield, type: 'rate' },
      price: { value: ticket.price, type: 'currency' }
    };
  });
</script>

<Breadcrumb
  pages={[
    {
      href: '/',
      title: 'Investments',
      isRoot: true
    },
    {
      href: '/stocks',
      title: 'Stocks'
    },
    {
      href: '/stocks/sectors',
      title: 'Sectors'
    },
    {
      href: '/stocks/sub-sectors',
      title: 'Sub Sectors'
    },
    {
      href: '/stocks/segments',
      title: 'Segments'
    },
    {
      href: '/stocks/companies',
      title: 'Companies'
    },
    {
      href: '/stocks/tickets',
      title: 'Tickets',
      isCurrentPage: true
    }
  ]}
/>

<DataTable {headers} {rows} />
