<script lang="ts">
  import MultiRangeSlider from '@/components/Form/MultiRangeSlider.svelte';
  // import DoubleRangeSlider from '@/components/Form/DoubleRangeSlider.svelte';
</script>

<div class="container">
  <div class="flex m-6">
    <div class="grow">
      <div class="mt-6">
        <MultiRangeSlider name="test" min={1} max={100} />
      </div>
    </div>
  </div>
</div>
