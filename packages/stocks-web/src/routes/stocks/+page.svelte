<script lang="ts">
  import type { SectorQuery } from '@pibernetwork/stocks-model/src/types';

  export let data: any;

  const { sectors } = data as { sectors: SectorQuery[] };
</script>

<div>
  <h2>Sectors</h2>
  {#each sectors as sector}
    <div class="section sector-item">
      <a class="link" href={`/stocks/sectors/${sector.slug}`}>{sector.name}</a>
    </div>
    <div class="subsectors">
      {#each sector.subSectors as subSector}
        <div class="section subsector-item">
          <a class="link" href={`/stocks/sub-sectors/${subSector.slug}`}>{subSector.name}</a>
        </div>
        <div class="segments">
          {#each subSector.segments as segment}
            <div class="section segment-item">
              <a class="link" href={`/stocks/segments/${segment.slug}`}>{segment.name}</a>
            </div>
            {#each segment.companies as company}
              <div class="section company-item">
                <a class="link" href={`/stocks/companies/${company.slug}`}>{company.name}</a>
              </div>
              {#each company.tickets as ticket}
                <div class="section ticket-item">
                  <a class="link" href={`/stocks/ticket/${ticket.slug}`}>{ticket.name}</a>
                </div>
              {/each}
            {/each}
          {/each}
        </div>
      {/each}
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
  .link {
    padding: 1rem;
  }
</style>
