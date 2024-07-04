<script lang="ts">
	import { goto } from '$app/navigation';
  import { page } from '$app/stores'
	import SalesOrderTable from '$lib/components/SalesOrderTable.svelte';
  </script>


<h1>Admin</h1>

{#if $page.data.user}
  <p>Welcome {$page.data.user.name}!</p>
{/if}


{#if $page.data.user.role === 'ADMIN'}
  <form action="/logout" method="POST">
    <button type="submit">Log out</button>
  </form>
{/if}
