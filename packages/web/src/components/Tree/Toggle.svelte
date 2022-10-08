<script lang="ts">
  import Icon from '@iconify/svelte';

  export let isOpen: boolean;
</script>

<div class="cursor-pointer" on:click>
  {#if isOpen}
    <Icon icon="ant-design:up-square-filled" width={24} height={24} />
  {:else}
    <Icon icon="ant-design:down-square-filled" width={24} height={24} />
  {/if}
</div>
