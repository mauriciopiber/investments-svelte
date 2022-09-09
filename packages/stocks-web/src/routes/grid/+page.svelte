<script lang="ts">
  import { Grid, Row, Column, Tile } from 'carbon-components-svelte';
</script>

<Grid fullWidth>
  <Row>
    <Column>
      <Tile>T1</Tile>
    </Column>
    <Column>T2</Column>
    <Column>T3</Column>
  </Row>
  <Row>
    <Column>T1</Column>
  </Row>
  <Row>
    <Column>T1</Column>
  </Row>
  <Row>
    <Column>T1</Column>
  </Row>
</Grid>

<Tile>
  <Grid>
    <Row>
      <Column>
        <Tile>T1</Tile>
      </Column>
      <Column>T2</Column>
      <Column>T3</Column>
    </Row>
    <Row>
      <Column>
        <Tile>T1</Tile>
      </Column>
      <Column>T2</Column>
      <Column>T3</Column>
    </Row>
  </Grid>
</Tile>

<style>
  .box--col {
    margin: 1rem;
  }
</style>
