<script lang="ts">
  import { enhance } from '$app/forms';

  let username = '';
  let email = '';
  let password = '';
  let error = '';
  let success = false;

  function handleSubmit() {
    error = '';
    success = false;
  }
</script>

<form method="POST" use:enhance={() => {
  return ({ result }) => {
    if (result.type === 'success') {
      success = true;
    } else {
      error = result.data?.error || 'An unknown error occurred';
    }
  };
}} on:submit|preventDefault={handleSubmit}>
  <input name="username" bind:value={username} placeholder="Username" required>
  <input name="email" type="email" bind:value={email} placeholder="Email" required>
  <input name="password" type="password" bind:value={password} placeholder="Password" required>
  <button type="submit">Register</button>
</form>

{#if error}
  <p class="error">{error}</p>
{/if}

{#if success}
  <p class="success">Registration successful!</p>
{/if}