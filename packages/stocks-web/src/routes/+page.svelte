<script lang="ts">
  import { Grid, Row, Column, Checkbox, Tile } from 'carbon-components-svelte';
</script>

<h1>Investments {`:)~`}</h1>

<Tile>
  <Grid>
    <Row>
      <Column>
        <div>Lets make development great again!</div>
      </Column>
    </Row>
    <Row>
      <Column sm={16} md={8} lg={8} xlg={8} max={4}>
        <h2>Server</h2>
        <Tile>
          <Checkbox labelText="Add data loaders" disabled checked />
          <Checkbox labelText="Add sort functionality" disabled />
          <Checkbox labelText="Add page functionality" disabled />
          <Checkbox labelText="Add filters functionality" disabled />
        </Tile>
      </Column>
      <Column sm={16} md={8} lg={8} xlg={8} max={4}>
        <h2>Web</h2>
        <Checkbox labelText="Add sort functionality" disabled />
      </Column>
      <Column sm={16} md={8} lg={8} xlg={8} max={4}>
        <h2>Cli</h2>
        <Checkbox labelText="Drop dividends by goal and use an UI" disabled />
        <Checkbox labelText="Drop dividends by sectors and use an UI" disabled />
        <Checkbox labelText="Drop dividends by wallet and use an UI" disabled />
      </Column>
      <Column sm={16} md={8} lg={8} xlg={8} max={4}>
        <h2>Model</h2>
        <Tile>
          <Checkbox labelText="Create abstract repositories" disabled checked />
          <Checkbox labelText="Add all repository methods" disabled />
        </Tile>
      </Column>
      <Column sm={16} md={8} lg={8} xlg={8} max={4}>
        <h2>IT</h2>
        <Tile>
          <Checkbox labelText="Deploy web in vercel" disabled checked />
          <Checkbox labelText="Deploy server in vercel" disabled checked />
        </Tile>
      </Column>
      <Column sm={16} md={8} lg={8} xlg={8} max={4}>
        <h2>Monorepo</h2>
        <Tile>
          <Checkbox labelText="Add dotenv" disabled checked />
          <Checkbox labelText="Add eslint" disabled checked />
          <Checkbox labelText="Add prettier" disabled checked />
          <Checkbox labelText="Add Changelog" disabled checked />
        </Tile>
      </Column>
    </Row>
  </Grid>
</Tile>

<style>
  :global(.bx--checkbox-label-text) {
    color: rgb(22, 22, 22);
  }
  :global(.bx--row) {
    border: 1px solid black;
  }

  :global(.bx--row > *) {
    border: 1px solid black;
    padding: 5rem;
  }
</style>
