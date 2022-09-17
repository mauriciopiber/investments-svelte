<script lang="ts">
  import BreadcrumbItem from './BreadcrumbItem.svelte';
  import BreadcrumbLink from './BreadcrumbLink.svelte';
  import BreadcrumbTitle from './BreadcrumbTitle.svelte';

  interface BreadcrumbItem {
    href: string;
    title: string;
    isRoot?: boolean;
    isCurrentPage?: boolean;
  }

  type Breadcrumb = BreadcrumbItem[];
  export let pages: Breadcrumb;
</script>

<nav class="flex" aria-label="Breadcrumb">
  <ol class="inline-flex items-center space-x-1 md:space-x-3">
    {#each pages as { isCurrentPage, title, href, isRoot }}
      <BreadcrumbItem>
        {#if isCurrentPage}
          <BreadcrumbTitle>{title}</BreadcrumbTitle>
        {:else}
          <BreadcrumbLink root={isRoot} {href}>{title}</BreadcrumbLink>
        {/if}
      </BreadcrumbItem>
    {/each}
  </ol>
</nav>
