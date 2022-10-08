<script lang="ts">
  export let data: { title: string; status: string; server: string };

  const { title, status, server } = data;
</script>

<div>{title}</div>
<div>{status}</div>
<div>{server}</div>
