<script lang="ts">
  import type { ActionData } from './$types'
  import { enhance } from '$app/forms'

  export let form: ActionData
</script>

<div class="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
  <div class="bg-[#DDE9EE] p-8 rounded-lg shadow-xl w-full max-w-md">
    <h1 class="text-3xl font-bold mb-6 text-[#3C6581]">Register</h1>

    <form action="?/register" method="POST" use:enhance class="space-y-6">
      <div>
        <label for="username" class="block text-sm font-medium text-[#3C6581] mb-1">Username</label>
        <input id="username" name="username" type="text" required 
               class="w-full px-3 py-2 border border-[#FCFDFC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2394C5] transition"/>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-[#3C6581] mb-1">Password</label>
        <input id="password" name="password" type="password" required 
               class="w-full px-3 py-2 border border-[#FCFDFC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2394C5] transition"/>
      </div>

      {#if form?.user}
        <p class="text-red-500 text-sm">Username is already taken.</p>
      {/if} 

      <button type="submit" 
              class="w-full bg-[#2394C5] text-white py-2 px-4 rounded-md hover:bg-[#3C6581] focus:outline-none focus:ring-2 focus:ring-[#2394C5] focus:ring-offset-2 transition">
        Register
      </button>
    </form>

    <p class="mt-4 text-sm text-[#3C6581] text-center">
      Already have an account? <a href="/login" class="text-[#2394C5] hover:underline">Log in</a>
    </p>
  </div>
</div>