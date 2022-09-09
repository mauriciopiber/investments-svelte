<script lang="ts">
  import { Grid, Row, Column, Tile } from 'carbon-components-svelte';
</script>

<Grid>
  <Row>
    <Column sm={4} md={8} lg={8} xlg={3} max={4}>Column 1</Column>
    <Column sm={4} md={8} lg={8} xlg={9} max={12}>Column 2</Column>
    <!-- <Column sm={2} md={1} lg={8} xlg={8} max={1}>Column 2</Column>
    <Column sm={2} md={1} lg={8} max={1}>Column 3</Column>
    <Column sm={2} md={1} lg={4} max={1}>Column 4</Column> -->
  </Row>
</Grid>
<h2>!</h2>

<Grid>
  <Row>
    <Column>Column 1</Column>
    <Column>Column 2</Column>
    <Column>Column 3</Column>
    <Column>Column 4</Column>
  </Row>
</Grid>

<style>
  :global(.bx--row) {
    border: 1px solid black;
  }

  :global(.bx--row > *) {
    border: 1px solid black;
    padding: 5rem;
  }
</style>
