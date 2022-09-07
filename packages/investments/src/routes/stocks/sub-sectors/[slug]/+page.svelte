<script lang="ts">
  export let data: {
    title: string;
    segments: string[];
  };

  const { title, segments } = data;
</script>

<h1>Sub sector {title}</h1>

<h2>Segments</h2>
{#each segments as segment}
  <div>
    <a href="/stocks/segments/{segment}">{segment}</a>
  </div>
{/each}
