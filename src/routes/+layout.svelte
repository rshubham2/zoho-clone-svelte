<script>
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores'
	import { enhance } from '$app/forms'
	import Dashboard from '$lib/components/Dashboard.svelte';
</script>

<!-- <svelte:head>
	<title>My App</title>
    <link rel="icon" href="favicon.ico" />
</svelte:head> -->

<nav>
	{#if !$page.data.user}
		<a href="/login">Login</a>
		<a href="/register">Register</a>
 	{/if}

  {#if $page.data.user}
    <a href="/admin">Admin</a><br>
	<a href="/dashboard">Dashboard</a>

    <form action="/logout" method="POST" use:enhance>
      <button type="submit">Log out</button>
    </form>
  {/if}
</nav>

<main>
	<slot />
</main>

<!-- <div class="app-container">
	<Header />
	<div class="content-wrapper">
		<Sidebar />
	</div>
	<Footer />
</div> -->

<style>

	main {
		flex: 1;
		padding: 1rem;
	}
</style>
