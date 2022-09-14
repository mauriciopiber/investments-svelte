<script lang="ts">
  import type { Filter } from '@pibernetwork/stocks-model/src/types';
  import { Grid, Row, Column, Tile } from 'carbon-components-svelte';
  export let data: { filters: Filter[] };
  const { filters } = data;
</script>

<Grid>
  {#each filters as filter}
    <Row>
      <Column>
        <Tile>
          <Row>
            <Column>
              {filter.key}
            </Column>
          </Row>
          <Row>
            <Column>{filter.range.min}</Column>
            <Column>{filter.range.max}</Column>
          </Row>
        </Tile>
      </Column>
    </Row>
  {/each}
</Grid>

<style>
  :global(.bx--tile) {
    border: 1px solid black;
  }
</style>
