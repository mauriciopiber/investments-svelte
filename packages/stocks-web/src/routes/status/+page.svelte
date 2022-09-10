<script lang="ts">
  export let data: { title: string; status: string };

  const { title, status } = data;
</script>

<div>{title}</div>
<div>{status}</div>
