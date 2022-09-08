<script lang="ts">
  export let data: {
    title: string;
    subSectors: string[];
  };

  const { title, subSectors } = data;
</script>

<h1>Sector {title}</h1>

<h2>Sub sectors</h2>
{#each subSectors as subSector}
  <div>
    <a href="/stocks/sub-sectors/{subSector}">{subSector}</a>
  </div>
{/each}
