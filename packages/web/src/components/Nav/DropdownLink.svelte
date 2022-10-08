<script lang="ts">
  export let href: string;
</script>

<a
  {href}
  on:click
  class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><slot /></a
>
