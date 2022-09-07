<script lang="ts">
  import type { Stock } from '@global/types';

  export let data: {
    title: string;
    stock: Stock;
  };

  const { stock } = data;
</script>

<h1>Ticket {stock.ticket}</h1>
