<script lang="ts">
  export let min: number;
  export let max: number;
  export let name: string;

  let minValue = min;
  let maxValue = max;

  let maxThumb = 0;
  let minThumb = 0;

  function minTrigger() {
    if (minValue > maxValue) {
      minValue = maxValue - 1;
    }

    minThumb = ((minValue - min) / (max - min)) * 100;
  }

  function maxTrigger() {
    if (maxValue < minValue) {
      maxValue = minValue + 1;
    }
    maxThumb = 100 - ((maxValue - min) / (max - min)) * 100;
  }
</script>

<div class="relative">
  <div>
    <input
      type="range"
      step="1"
      {min}
      {max}
      name={`${name}_min`}
      bind:value={minValue}
      on:input={minTrigger}
      class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
    />

    <input
      type="range"
      step="1"
      {min}
      {max}
      name={`${name}_max`}
      bind:value={maxValue}
      on:input={maxTrigger}
      class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
    />

    <div class="relative z-10 h-2">
      <div class="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200" />

      <div
        class="absolute z-20 top-0 bottom-0 rounded-md bg-green-300"
        style="right: {maxThumb}%; left: {minThumb}%"
      />

      <div
        class="absolute z-30 w-6 h-6 top-0 left-0 bg-green-300 rounded-full -mt-2"
        style="left: {minThumb}%"
      />

      <div
        class="absolute z-30 w-6 h-6 top-0 right-0 bg-green-300 rounded-full -mt-2"
        style="right: {maxThumb}%"
      />
    </div>
  </div>

  <div class="flex items-center justify-between pt-5 space-x-4 text-sm text-gray-700">
    <div>
      <input
        type="input"
        maxlength="5"
        disabled
        bind:value={minValue}
        on:input={minTrigger}
        class="w-28  py-2 text-center border border-gray-200 rounded-lg bg-gray-50 focus:border-yellow-400 focus:outline-none"
      />
    </div>
    <div>
      <input
        type="input"
        maxlength="5"
        disabled
        bind:value={maxValue}
        on:input={maxTrigger}
        class="w-28 py-2 text-center border border-gray-200 rounded-lg bg-gray-50 focus:border-yellow-400 focus:outline-none"
      />
    </div>
  </div>
</div>

<style>
  input[type='range']::-webkit-slider-thumb {
    pointer-events: all;
    width: 24px;
    height: 24px;
    -webkit-appearance: none;

    /* @apply w-6 h-6 appearance-none pointer-events-auto; */
  }
</style>
