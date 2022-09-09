<script lang="ts">
  export let href: string;
</script>

<a class="stocks__link" {href}><slot /></a>

<style>
  .stocks__link {
    display: inline-block;
    text-decoration: none;
  }
</style>
