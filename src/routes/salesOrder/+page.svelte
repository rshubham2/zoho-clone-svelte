<script lang="ts">
    import '$lib/styles/app.css'
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import SalesOrderTable from '$lib/components/SalesOrderTable.svelte';
	import type { SalesOrder } from '$lib/types';

    export let data: PageData;

    function handlePageChange(event: CustomEvent<number>) {
        goto(`?page=${event.detail}`);
    }

    function handleOrderClick(event: CustomEvent<SalesOrder>) {
        const order = event.detail;
        console.log('Order clicked:', order);
    }
</script>

<h1>Sales Orders</h1>
<SalesOrderTable 
    orders={data.orders} 
    currentPage={data.currentPage} 
    totalPages={data.totalPages}
    on:pageChange={handlePageChange}
    on:orderClick={handleOrderClick}
/>