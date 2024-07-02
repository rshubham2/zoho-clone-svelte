<script lang="ts">
  import type { ActionData } from './$types'
  import { enhance } from '$app/forms'
  
  export let form: ActionData

  let password = ''
  let confirmPassword = ''
  let passwordsMatch = true
  let confirmPasswordTouched = false

  $: {
    if (confirmPasswordTouched) {
      passwordsMatch = password === confirmPassword
    } else {
      passwordsMatch = true
    }
  }

  function handleConfirmPasswordInput() {
    confirmPasswordTouched = true
  }

  function handleSubmit(event: { preventDefault: () => void; }) {
    if (!passwordsMatch) {
      event.preventDefault()
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-[#C9E3F8]">
  <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm border-2 border-black">
    <!-- Logo and Register text -->
    <div class="flex flex-col items-center mb-4">
      <img src="src\lib\assets\vc2.png" alt="Company Logo" class="h-20 w-auto mb-2"/>
      <!-- <h1 class="text-2xl font-bold text-[#3C6581]">Register</h1> -->
    </div>
    
    <form action="?/register" method="POST" use:enhance on:submit={handleSubmit} class="space-y-4">
      <div>
        <label for="username" class="block text-xs font-medium text-[#3C6581] mb-1">Username</label>
        <input id="username" name="username" type="text" required
               class="w-full px-2 py-1 text-sm bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2394C5] transition"/>
      </div>
      
      <div>
        <label for="email" class="block text-xs font-medium text-[#3C6581] mb-1">Email</label>
        <input id="email" name="email" type="email" required
               class="w-full px-2 py-1 text-sm bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2394C5] transition"/>
      </div>
      
      <div>
        <label for="password" class="block text-xs font-medium text-[#3C6581] mb-1">Password</label>
        <input id="password" name="password" type="password" required bind:value={password}
               class="w-full px-2 py-1 text-sm bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2394C5] transition"/>
      </div>
      
      <div>
        <label for="confirmPassword" class="block text-xs font-medium text-[#3C6581] mb-1">Confirm Password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" required bind:value={confirmPassword}
               on:input={handleConfirmPasswordInput}
               class="w-full px-2 py-1 text-sm bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2394C5] transition"/>
      </div>
      
      {#if confirmPasswordTouched && !passwordsMatch}
        <p class="text-red-500 text-xs">Passwords do not match.</p>
      {/if}

      {#if form?.user}
        <p class="text-red-500 text-xs">Username is already taken.</p>
      {/if}
      
      {#if form?.email}
        <p class="text-red-500 text-xs">Email already in use.</p>
      {/if}
      
      <button type="submit"
              class="w-full bg-[#2394C5] text-white py-1 px-3 text-sm rounded-md hover:bg-[#3C6581] focus:outline-none focus:ring-2 focus:ring-[#2394C5] focus:ring-offset-2 transition"
              disabled={!passwordsMatch}>
        Register
      </button>
    </form>
    
    <p class="mt-3 text-xs text-[#3C6581] text-center">
      Already have an account? <a href="/login" class="text-[#2394C5] hover:underline">Sign In</a>
    </p>
    
    <p class="mt-3 text-xs text-gray-500 text-center">
      Powered by VC Tech
    </p>
  </div>
</div>