<script lang="ts">
  import type { ActionData } from './$types'
  import { enhance } from '$app/forms'
  import '$lib/styles/app.css'
  export let form: ActionData
</script>


<div class="min-h-screen flex items-center justify-center bg-[#C9E3F8]">
  <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm border-2 border-black">
    <!-- Logo and Sign In text -->
    <div class="flex flex-col items-center mb-6">
      <img src="src\lib\assets\vc2.png" alt="Company Logo" class="h-20 w-auto mb-3"/>
      <h1 class="text-2xl font-bold text-[#3C6581]">Sign In</h1>
    </div>
    
    <form action="?/login" method="POST" use:enhance class="space-y-4">
      <div>
        <label for="username" class="block text-xs font-medium text-[#3C6581] mb-1">Username</label>
        <input id="username" name="username" type="text" required
               class="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2394C5] transition"/>
      </div>
      
      <div>
        <label for="password" class="block text-xs font-medium text-[#3C6581] mb-1">Password</label>
        <input id="password" name="password" type="password" required
               class="w-full px-2 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2394C5] transition"/>
      </div>
      
      {#if form?.invalid || form?.notFound || form?.approval || form?.credentials}
        <p class="text-red-500 text-xs">
          {#if form?.invalid}Username and password are required.
          {:else if form?.notFound}User not found.
          {:else if form?.approval}Your account approval is pending.
          {:else}You have entered the wrong credentials.
          {/if}
        </p>
      {/if}
      
      <button type="submit"
              class="w-full bg-[#2394C5] text-white py-1.5 px-3 text-sm rounded-md hover:bg-[#3C6581] focus:outline-none focus:ring-1 focus:ring-[#2394C5] focus:ring-offset-2 transition">
        SIGN IN
      </button>
    </form>
    
    <p class="mt-3 text-xs text-[#3C6581] text-center">
      Don't have an account? <a href="/register" class="text-[#2394C5] hover:underline">Sign up</a>
    </p>
    
    <p class="mt-4 text-xs text-gray-500 text-center">
      Powered by VC Tech
    </p>
  </div>
</div>