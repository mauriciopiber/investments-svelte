<script>
  import DataTable from '@/components/DataTable/DataTable.svelte';

  const header = [
    {
      title: 'T1',
      key: 't1'
    },
    { title: 'T2', key: 't2' }
  ];

  const rows = [
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

<DataTable {header} {rows} />
