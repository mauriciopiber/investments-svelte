<script lang="ts">
  import { fetchGraphql } from '@/utils/fetch';
  import type { Filter } from '@pibernetwork/model/src/types';

  export let search: Filter[];

  async function fetchData(searchKeys: Filter[]) {
    const queryStocks = `
      query($input: [Search]) {
        search(input: $input) {
          count
          tickets {
            name
            slug
          }
        }
      }
  `;

    const data = await fetchGraphql(queryStocks, { input: searchKeys });

    const { search } = data;
    const { count, tickets } = search;

    console.log(count, tickets);

    return {
      count,
      data: tickets
    };
  }
</script>

{#await fetchData(search)}
  <p>loading</p>
{:then response}
  <div>{response.count}</div>
  <div class="grid grid-cols-4">
    {#each response.data as ticket}
      <div>
        <a href={`/stocks/tickets/${ticket.slug}`}>{ticket.name}</a>
      </div>
    {/each}
  </div>
{:catch e}
  <p style="color: red">{e.message}</p>
{/await}
