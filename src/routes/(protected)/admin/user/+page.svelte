<!-- <script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  import { slide } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { Toaster, toast } from 'svelte-sonner';

  export let data: PageData;

  let activeTab: 'pending' | 'approved' = 'pending';

  function enhanceForm(action: 'approve' | 'decline') {
    return async ({ result }: { result: any }) => {
      if (result.type === 'success') {
        const user = data.pendingUsers.find(u => u.id === result.data.userId);
        if (user) {
          data.pendingUsers = data.pendingUsers.filter(u => u.id !== result.data.userId);
          if (action === 'approve') {
            data.approvedUsers = [user, ...data.approvedUsers];
            toast.success('User approved successfully');
          } else {
            toast.success('User declined');
          }
        }
      } else {
        toast.error('An error occurred');
      }
    };
  }

  $: activeUsers = activeTab === 'pending' ? data.pendingUsers : data.approvedUsers;
</script>

<Toaster />

<div class="container mx-auto px-4 py-8 max-w-6xl">
  <h1 class="text-4xl font-bold mb-8 text-center text-gray-800">User Approval Dashboard</h1>

  <div class="mb-8">
    <nav class="flex space-x-4" aria-label="Tabs">
      {#each ['pending', 'approved'] as tab}
        <button
          on:click={() => activeTab = tab === 'pending'? 'pending' : 'approved'}
          class={`px-3 py-2 font-medium text-sm rounded-md ${
            activeTab === tab
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
          <span class="ml-2 bg-gray-100 text-gray-900 px-2 py-1 rounded-full text-xs">
            {data[`${tab}Users`].length}
          </span>
        </button>
      {/each}
    </nav>
  </div>

  {#if activeUsers.length === 0}
    <p class="text-center text-gray-500">No {activeTab} users.</p>
  {:else}
    <div class="bg-white shadow-xl rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered On</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            {#if activeTab === 'pending'}
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            {/if}
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each activeUsers as user (user.id)}
            <tr in:slide|local={{ duration: 300 }} out:slide|local={{ duration: 300 }} animate:flip={{ duration: 300 }}>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} alt="" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{user.username}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{user.email}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${user.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {user.status}
                </span>
              </td>
              {#if activeTab === 'pending'}
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <form method="POST" action="?/approve" use:enhance class="inline-block">
                    <input type="hidden" name="userId" value={user.id}>
                    <button type="submit" class="text-green-600 hover:text-green-900 mr-4">Approve</button>
                  </form>
                  <form method="POST" action="?/decline" use:enhance class="inline-block">
                    <input type="hidden" name="userId" value={user.id}>
                    <button type="submit" class="text-red-600 hover:text-red-900">Decline</button>
                  </form>
                </td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div> -->