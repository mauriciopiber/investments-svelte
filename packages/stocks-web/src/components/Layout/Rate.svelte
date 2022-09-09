<script lang="ts">
  export let value: number;

  const roundValue = (Math.round(value * 100 * 100) / 100).toFixed(2);

  const valueFormatted = `${roundValue.toString().padStart(5, '0')} %`;
</script>

<span>
  {valueFormatted}
</span>

<style>
  span {
    display: inline-block;
  }
</style>
