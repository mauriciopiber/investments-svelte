<script lang="ts">
  export let data: {
    sectors: string[];
  };

  const { sectors } = data;
</script>

<h1>Sectors</h1>
{#each sectors as sector}
  <div>
    <a href="/stocks/sectors/{sector}">{sector}</a>
  </div>
{/each}
