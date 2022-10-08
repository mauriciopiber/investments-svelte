<script lang="ts">
  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.svelte';
  import Tree from '@/components/Tree/Tree.svelte';
  import type { BreadcrumbConfig } from '@/types';
  import type { SectorQuery } from '@pibernetwork/model/src/types';

  export let data: { sectors: SectorQuery[] };

  const { sectors } = data;

  const breadcrumb: BreadcrumbConfig = [{ key: 'investments' }, { key: 'stocks' }];
</script>

<svelte:head>
  <title>Stocks</title>
</svelte:head>

<Breadcrumb config={breadcrumb} />

<Tree {sectors} />
