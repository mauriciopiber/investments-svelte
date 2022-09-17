<script lang="ts">
  import DataTable from '@/components/DataTable/DataTable.svelte';
  import type { Header, Rows } from '@/types';

  const headers: Header = [
    {
      label: 'T1',
      key: 't1'
    },
    { label: 'T2', key: 't2' }
  ];

  const rows: Rows = [
    {
      t1: 'a',
      t2: 'b'
    },
    {
      t1: 'c',
      t2: 'd'
    }
  ];
</script>

<DataTable {headers} {rows} />
