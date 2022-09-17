<script lang="ts">
  import { fetchGraphql } from '@/utils/fetch';
  import type { Filter } from '@pibernetwork/stocks-model/src/types';

  export let search: Filter[];

  async function fetchData(searchKeys: Filter[]) {
    const queryStocks = `
      query($input: [Search]) {
        search(input: $input) {
          count
          tickets {
            name
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
{:catch}
  <p style="color: red">error</p>
{/await}
