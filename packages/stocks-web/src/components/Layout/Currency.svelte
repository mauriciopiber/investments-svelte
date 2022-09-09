<script lang="ts">
  export let value;

  const formatConfig: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    currencyDisplay: 'symbol'
  };

  const formattedValue = new Intl.NumberFormat('en-US', formatConfig)
    .format(value)
    .replace(/^(\D+)/, '$1 ');
</script>

<span>
  {formattedValue}
</span>

<style>
  span {
    display: inline-block;
  }
</style>
