<script lang="ts">
  import Rate from '@/components/Layout/Rate.svelte';
  import Currency from '@/components/Layout/Currency.svelte';
  export let averageIncome: number;
  export let averageYield: number;
</script>

<div class="income">
  <div class="items">
    <div class="item average">
      <Currency value={averageIncome} />
    </div>
    <div class="item yield">
      <Rate value={averageYield} />
    </div>
  </div>
</div>

<style>
  .income {
    display: inline-block;
  }

  .items {
    display: flex;
  }

  .item {
    padding: 0 1rem;
  }
</style>
