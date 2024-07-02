<script lang="ts">
    import type { SalesOrder } from '$lib/types';
    import { createEventDispatcher } from 'svelte';
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import { Cog, CheckCircle, AlertCircle, XCircle } from 'lucide-svelte';

    export let orders: SalesOrder[] = [];
    export let currentPage = 1;
    export let totalPages = 1;
    export let totalCount = 0;

    let searchTerm = '';
    let filteredOrders = orders;
    let visibleColumns = [
        'date', 'salesorder_number', 'customer_name', 'reference_number', 'total',
        'status', 'invoiced_status', 'payment_status', 'shipment_date', 'order_status', 'delivery_method'
    ];
    let isColumnSelectorOpen = false;

    $: {
        filteredOrders = orders.filter(order => 
            order.salesorder_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    const dispatch = createEventDispatcher();
   
    function handleRowClick(order: SalesOrder) {
        goto(`/salesOrder/${order.salesorder_id}`);
        console.log(orders)
    }

    function changePage(newPage: number) {
        goto(`?page=${newPage}`);
    }

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(amount);
    }

    function toggleColumn(column: string) {
        if (visibleColumns.includes(column)) {
            visibleColumns = visibleColumns.filter(c => c !== column);
        } else {
            visibleColumns = [...visibleColumns, column];
        }
    }
</script>

<div class="container mx-auto px-4 py-8">
    <div class="mb-4 flex justify-between items-center">
        <input
            type="text"
            placeholder="Search orders..."
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            bind:value={searchTerm}
        />
        <div class="relative ml-4">
            <button on:click={() => isColumnSelectorOpen = !isColumnSelectorOpen} class="p-2 rounded-full hover:bg-gray-200">
                <Cog size={24} />
            </button>
            {#if isColumnSelectorOpen}
                <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div class="py-1">
                        {#each ['date', 'salesorder_number', 'customer_name', 'reference_number', 'total', 'status', 'invoiced_status', 'payment_status', 'shipment_date', 'order_status', 'delivery_method'] as column}
                            <label class="flex items-center px-4 py-2 hover:bg-gray-100">
                                <input
                                    type="checkbox"
                                    checked={visibleColumns.includes(column)}
                                    on:change={() => toggleColumn(column)}
                                    class="mr-2"
                                />
                                {column.replace('_', ' ')}
                            </label>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    </div>

    <div class="overflow-x-auto bg-white shadow-md rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    {#if visibleColumns.includes('date')}
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                    {/if}
                    {#if visibleColumns.includes('salesorder_number')}
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Sales Order#</th>
                    {/if}
                    {#if visibleColumns.includes('customer_name')}
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Customer Name</th>
                    {/if}
                    {#if visibleColumns.includes('reference_number')}
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Reference#</th>
                    {/if}
                    {#if visibleColumns.includes('total')}
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Amount</th>
                    {/if}
                    {#if visibleColumns.includes('status')}
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                    {/if}
                    {#if visibleColumns.includes('invoiced_status')}
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Invoiced</th>
                    {/if}
                    {#if visibleColumns.includes('payment_status')}
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Payment</th>
                    {/if}
                    {#if visibleColumns.includes('shipment_date')}
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Expected Shipment Date</th>
                    {/if}
                    {#if visibleColumns.includes('order_status')}
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Order Status</th>
                    {/if}
                    {#if visibleColumns.includes('delivery_method')}
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Delivery Method</th>
                    {/if}
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                {#each filteredOrders as order (order.salesorder_id)}
                    <tr 
                        class="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                        on:click={() => handleRowClick(order)}
                        transition:fade
                    >
                        {#if visibleColumns.includes('date')}
                            <td class="px-6 py-4 whitespace-nowrap">{new Date(order.date).toLocaleDateString()}</td>
                        {/if}
                        {#if visibleColumns.includes('salesorder_number')}
                            <td class="px-6 py-4 whitespace-nowrap">{order.salesorder_number}</td>
                        {/if}
                        {#if visibleColumns.includes('customer_name')}
                            <td class="px-6 py-4 whitespace-nowrap">{order.customer_name}</td>
                        {/if}
                        {#if visibleColumns.includes('reference_number')}
                            <td class="px-6 py-4 whitespace-nowrap">{order.reference_number}</td>
                        {/if}
                        {#if visibleColumns.includes('total')}
                            <td class="px-6 py-4 whitespace-nowrap">{formatCurrency(order.total)}</td>
                        {/if}
                        {#if visibleColumns.includes('status')}
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    {order.order_status === 'pending_approval' ? 'bg-red-100 text-red-800' : 
                                    order.order_status === 'open' ? 'bg-green-100 text-green-800' : 
                                    order.order_status === 'closed' ? 'bg-gray-100 text-gray-800' : 
                                    'bg-yellow-100 text-yellow-800'}">
                                    {order.order_status}
                                </span>
                            </td>
                        {/if}
                        {#if visibleColumns.includes('invoiced_status')}
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="relative inline-block group">
                                    {#if order.invoiced_status === 'partially_invoiced'}
                                        <AlertCircle size={24} class="text-yellow-500"  />
                                    {:else if order.invoiced_status === 'invoiced'}
                                        <CheckCircle size={24} class="text-green-500" />
                                    {:else}
                                        <XCircle size={24} class="text-gray-500" />
                                    {/if}
                                    <div class="absolute z-10 w-auto p-2 m-2 min-w-max rounded-md shadow-md
                                        text-white bg-gray-900 text-xs font-bold 
                                        transition-opacity duration-300 
                                        opacity-0 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2">
                                        {order.invoiced_status}
                                        <svg class="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                                    </div>
                                </div>
                            </td>
                        {/if}
                        {#if visibleColumns.includes('payment_status')}
                            <td class="px-6 py-4 whitespace-nowrap">                                
                                <div class="relative inline-block group">
                                    {#if order.paid_status === 'partially_paid'}
                                        <AlertCircle size={24} class="text-yellow-500"  />
                                    {:else if order.paid_status === 'paid'}
                                        <CheckCircle size={24} class="text-green-500" />
                                    {:else}
                                        <XCircle size={24} class="text-gray-500" />
                                    {/if}
                                    <div class="absolute z-10 w-auto p-2 m-2 min-w-max rounded-md shadow-md
                                        text-white bg-gray-900 text-xs font-bold 
                                        transition-opacity duration-300 
                                        opacity-0 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2">
                                        {order.paid_status}
                                        <svg class="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                                    </div>
                                </div>
                            </td>
                        {/if}
                        {#if visibleColumns.includes('shipment_date')}
                            <td class="px-6 py-4 whitespace-nowrap">{order.shipment_date ? new Date(order.shipment_date).toLocaleDateString() : 'N/A'}</td>
                        {/if}
                        {#if visibleColumns.includes('order_status')}
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    {order.order_status === 'pending_approval' ? 'bg-red-100 text-red-800' : 
                                    order.order_status === 'open' ? 'bg-green-100 text-green-800' : 
                                    order.order_status === 'closed' ? 'bg-gray-100 text-gray-800' : 
                                    'bg-yellow-100 text-yellow-800'}">
                                    {order.order_status}
                                </span>
                            </td>
                        {/if}
                        {#if visibleColumns.includes('delivery_method')}
                            <td class="px-6 py-4 whitespace-nowrap">{order.delivery_method || 'N/A'}</td>
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
            <button 
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                disabled={currentPage === 1} 
                on:click={() => changePage(currentPage - 1)}
            >
                Previous
            </button>
            <button 
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                disabled={currentPage === totalPages} 
                on:click={() => changePage(currentPage + 1)}
            >
                Next
            </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-700">
                    Showing <span class="font-medium">{(currentPage - 1) * 10 + 1}</span> to <span class="font-medium">{Math.min(currentPage * 10, totalCount)}</span> of <span class="font-medium">{totalCount}</span> results
                </p>
            </div>
            <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button 
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        disabled={currentPage === 1} 
                        on:click={() => changePage(currentPage - 1)}
                    >
                        <span class="sr-only">Previous</span>
                        <!-- Heroicon name: solid/chevron-left -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                    <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        {currentPage}
                    </span>
                    <button 
                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        disabled={currentPage === totalPages} 
                        on:click={() => changePage(currentPage + 1)}
                    >
                        <span class="sr-only">Next</span>
                        <!-- Heroicon name: solid/chevron-right -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </nav>
            </div>
        </div>
    </div>
</div>