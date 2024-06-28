<script lang="ts">
  import { enhance } from '$app/forms';

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
      window.location.href = '/dashboard';
    } else {
      error = result.data?.error || 'An unknown error occurred';
    }
  };
}} on:submit|preventDefault={handleSubmit}>
  <input name="email" type="email" bind:value={email} placeholder="Email" required>
  <input name="password" type="password" bind:value={password} placeholder="Password" required>
  <button type="submit">Login</button>
</form>

{#if error}
  <p class="error">{error}</p>
{/if}

{#if success}
  <p class="success">Login successful! Redirecting...</p>
{/if}