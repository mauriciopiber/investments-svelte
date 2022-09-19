<script lang="ts">
  export let min: number;
  export let max: number;
  export let name: string;

  let minValue = min;
  let maxValue = max;
  const step = 0.01;

  function minTrigger() {
    if (minValue > maxValue) {
      minValue = maxValue - step;
    }
  }

  function maxTrigger() {
    if (maxValue < minValue) {
      maxValue = minValue + step;
    }
  }
</script>

<div class="relative p-4 box-border">
  <div class="flex justify-between">
    <div>{name}</div>
    <div>
      <label>
        <input type="checkbox" name={`${name}_nullable`} checked />
        Nullable
      </label>
    </div>
  </div>
  <div class="flex justify-between">
    <input
      type="range"
      {step}
      {min}
      {max}
      name={`${name}_min`}
      bind:value={minValue}
      on:input={minTrigger}
      class=""
    />

    <input
      type="range"
      {step}
      {min}
      {max}
      name={`${name}_max`}
      bind:value={maxValue}
      on:input={maxTrigger}
      class=""
    />
  </div>

  <div class="grid grid-cols-2">
    <input type="input" bind:value={minValue} on:input={minTrigger} disabled />

    <input type="input" bind:value={maxValue} on:input={maxTrigger} disabled />
  </div>
</div>
