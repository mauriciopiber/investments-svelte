<script lang="ts">
  import { Breadcrumb, BreadcrumbItem, Tile, DataTable } from 'carbon-components-svelte';

  import Link from '@/components/Layout/Link.svelte';
  import Income from '@/components/Stocks/Income.svelte';
  import type { SectorQuery } from '@pibernetwork/stocks-model/src/types';
  import Company from '@/components/Stocks/Company.svelte';

  export let data: { sectors: SectorQuery[] };

  const { sectors } = data;
</script>

<Breadcrumb noTrailingSlash>
  <BreadcrumbItem href="/">Investments</BreadcrumbItem>
  <BreadcrumbItem href="/stocks" isCurrentPage>Stocks</BreadcrumbItem>
</Breadcrumb>
<Tile>
  <h2>Stocks</h2>
  {#each sectors as sector}
    <Tile>
      <div class="section sector-item">
        <Link href={`/stocks/sectors/${sector.slug}`}>{sector.name}</Link>
        <Income
          averageIncome={sector.income.averageAmount}
          averageYield={sector.income.averageYield}
        />
      </div>
      <div class="subsectors">
        {#each sector.subSectors as subSector}
          <div class="section subsector-item">
            <Link href={`/stocks/sub-sectors/${subSector.slug}`}>{subSector.name}</Link>
            <Income
              averageIncome={subSector.income.averageAmount}
              averageYield={subSector.income.averageYield}
            />
          </div>
          <div class="segments">
            {#each subSector.segments as segment}
              <div class="section segment-item">
                <Link href={`/stocks/segments/${segment.slug}`}>{segment.name}</Link>
                <Income
                  averageIncome={segment.income.averageAmount}
                  averageYield={segment.income.averageYield}
                />
              </div>
              {#each segment.companies as company}
                <div class="section company-item">
                  <Link href={`/stocks/companies/${company.slug}`}>{company.name}</Link>
                  <Income
                    averageIncome={company.income.averageAmount}
                    averageYield={company.income.averageYield}
                  />
                </div>

                {#each company.tickets as ticket}
                  <div class="section ticket-item">
                    <Link href={`/stocks/ticket/${ticket.slug}`}>{ticket.name}</Link>
                    <Income
                      averageIncome={ticket.income.range.averageIncome}
                      averageYield={ticket.income.range.averageYield}
                    />
                  </div>
                {/each}
              {/each}
            {/each}
          </div>
        {/each}
      </div></Tile
    >
  {/each}
</Tile>

<style>
  .page {
    padding: 1rem;
  }
  .section {
    padding: 0.5rem 1rem;
  }

  .subsector-item {
    padding: 0.5rem 4rem;
  }

  .segment-item {
    padding: 0.5rem 6rem;
  }

  .company-item {
    padding: 0.5rem 8rem;
  }

  .ticket-item {
    padding: 0.5rem 10rem;
  }
  .link {
    padding: 1rem;
  }
</style>
