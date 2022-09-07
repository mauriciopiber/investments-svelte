<script lang="ts">
  export let data: {
    title: string;
    tickets: string[];
  };

  const { title, tickets } = data;
</script>

<h1>Company {title}</h1>

<h2>Tickets</h2>
{#each tickets as ticket}
  <div>
    <a href="/stocks/ticket/{ticket}">{ticket}</a>
  </div>
{/each}
