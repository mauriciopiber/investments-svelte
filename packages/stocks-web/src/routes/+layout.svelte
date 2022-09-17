<script lang="ts">
  import '../app.css';
  import Nav from '../components/Nav/Nav.svelte';

  import routes from './index';
</script>

<Nav {routes} />

<slot />
