<script lang="ts">
  import { clickOutside } from '@/directives/clickOutside';
  import type { Route } from '@/types';
  import DropdownLink from './DropdownLink.svelte';

  export let isOpen: boolean = false;
  export let routes: Route[];

  function toggle() {
    isOpen = !isOpen;
  }
</script>

<div class="relative">
  <button
    on:click={toggle}
    id="dropdownNavbarLink"
    data-dropdown-toggle="dropdownNavbar"
    class="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
    ><slot />
    <svg
      class="ml-1 w-5 h-5"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      /></svg
    ></button
  >
  <!-- Dropdown menu -->
  <div
    id="dropdownNavbar"
    class="absolute z-10 w-44 font-normal bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
    class:hidden={!isOpen}
  >
    <ul
      class="py-1 text-sm text-gray-700 dark:text-gray-400"
      aria-labelledby="dropdownLargeButton"
      use:clickOutside
      on:click_outside={(isOpen && toggle) || undefined}
    >
      {#each routes as route}
        <li>
          {#if route.url}
            <DropdownLink on:click={toggle} href={route.url}>{route.label}</DropdownLink>
          {:else}
            <div>Error</div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</div>
