<script lang="ts">
  export let data: {
    title: string;
    companies: string[];
  };

  const { title, companies } = data;
</script>

<h1>Segment {title}</h1>

<h2>Companies</h2>
{#each companies as company}
  <div>
    <a href="/stocks/companies/{company}">{company}</a>
  </div>
{/each}
