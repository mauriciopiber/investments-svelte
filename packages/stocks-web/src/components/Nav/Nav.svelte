<script lang="ts">
  import type { Route } from '@/types';
  import Dropdown from './Dropdown.svelte';
  import NavLink from './NavLink.svelte';

  export let routes: Route[];
</script>

<nav class="px-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div class="flex flex-wrap flex-start items-center mx-auto">
    <a href="/" class="flex items-center">
      <!-- <img
        src="https://flowbite.com/docs/images/logo.svg"
        class="mr-3 h-6 sm:h-10"
        alt="Flowbite Logo"
      /> -->
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Stocks</span
      >
    </a>
    <button
      data-collapse-toggle="mobile-menu"
      type="button"
      class="inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500"
      aria-controls="mobile-menu-2"
      aria-expanded="false"
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        /></svg
      >
    </button>
    <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
      <ul
        class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
      >
        {#each routes as route}
          <li>
            {#if route.url}
              <NavLink href={route.url}>{route.label}</NavLink>
            {:else if route.pages}
              <Dropdown routes={route.pages}>{route.label}</Dropdown>
            {:else}
              <div>Error</div>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>
