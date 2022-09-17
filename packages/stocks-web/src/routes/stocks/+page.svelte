<script lang="ts">
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';

  import Link from '@/components/Layout/Link.svelte';
  import Income from '@/components/Stocks/Income.svelte';
  import type { BreadcrumbConfig } from '@/types';
  import type { SectorQuery } from '@pibernetwork/stocks-model/src/types';

  export let data: { sectors: SectorQuery[] };

  const { sectors } = data;

  const breadcrumb: BreadcrumbConfig = [{ key: 'investments' }, { key: 'stocks' }];
</script>

<Breadcrumb config={breadcrumb} />
<div>
  <h2>Stocks</h2>
  {#each sectors as sector}
    <div>
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
      </div>
    </div>
  {/each}
</div>

<style>
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
</style>
