<script lang="ts">
  import '../app.css';
  import Nav from '../components/Nav/Nav.svelte';

  import { routes } from './../utils/navigation';
</script>

<Nav {routes} />

<slot />
