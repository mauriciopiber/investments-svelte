<script lang="ts">
  import BreadcrumbItem from './BreadcrumbItem.svelte';
  import BreadcrumbLink from './BreadcrumbLink.svelte';
  import BreadcrumbTitle from './BreadcrumbTitle.svelte';
  import type { Breadcrumb, BreadcrumbConfig } from '@/types';
  import { createBreadcrumb } from '@/utils/navigation';

  export let config: BreadcrumbConfig;

  const pages: Breadcrumb = createBreadcrumb(config);
</script>

<nav class="flex" aria-label="Breadcrumb">
  <ol class="inline-flex items-center space-x-1 md:space-x-3">
    {#each pages as { isCurrentPage, label, href, isRoot }}
      <BreadcrumbItem>
        {#if isCurrentPage}
          <BreadcrumbTitle>{label}</BreadcrumbTitle>
        {:else}
          <BreadcrumbLink root={isRoot} {href}>{label}</BreadcrumbLink>
        {/if}
      </BreadcrumbItem>
    {/each}
  </ol>
</nav>
