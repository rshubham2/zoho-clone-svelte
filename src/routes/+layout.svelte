<script lang="ts">
  import '../app.postcss';
  import { page } from '$app/stores';
</script>

<nav>
  <a href="/">Home</a>
  {#if $page.data.user}
    <a href="/dashboard">Dashboard</a>
    <form method="POST" action="/auth/logout">
      <button type="submit">Logout</button>
    </form>
  {:else}
    <a href="/auth/login">Login</a>
    <a href="/auth/register">Register</a>
  {/if}
</nav>

<main>
  <slot />
</main>

<footer>
  <p>&copy; 2024 Zoho Clone</p>
</footer>