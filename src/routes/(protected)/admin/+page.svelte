<script lang="ts">
  import { page } from '$app/stores'
</script>

<h1>Admin</h1>

{#if $page.data.user}
  <p>Welcome {$page.data.user.name}!</p>
{/if}

{#if $page.data.user.role === 'ADMIN'}
  <p>You are an admin.</p>
  <ul>
    <li><a href="/admin/user">Manage Users</a></li>
    <li><a href="/admin/posts">Manage Posts</a></li>
    <!-- Add more admin-specific links here -->
  </ul>
  <form action="/logout" method="POST">
    <button type="submit">Log out</button>
  </form>
{/if}
