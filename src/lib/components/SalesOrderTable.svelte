<script lang="ts">
    import type { SalesOrder } from '$lib/types';
    import { createEventDispatcher } from 'svelte';
    import { goto } from '$app/navigation';

    export let orders: SalesOrder[] = [];
    export let currentPage = 1;
    export let totalPages = 1;

    const dispatch = createEventDispatcher();
   
    function handleRowClick(order: SalesOrder) {
        goto(`/salesOrder/${order.salesorder_id}`);
    }

    function changePage(newPage: number) {
        goto(`?page=${newPage}`);
    }
</script>

<table>
    <thead>
        <tr>
            <th>DATE</th>
            <th>SALES ORDER#</th>
            <th>CUSTOMER NAME</th>
            <th>REFERENCE#</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
            <th>INVOICED</th>
            <th>PAYMENT</th>
            <th>EXPECTED SHIPMENT DATE</th>
            <th>ORDER STATUS</th>
            <th>DELIVERY METHOD</th>
        </tr>
    </thead>
    <tbody>
        {#each orders as order}
            <tr on:click={() => handleRowClick(order)}>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>{order.salesorder_number}</td>
                <td>{order.customer_name}</td>
                <td>{order.reference_number}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
                <td>{order.invoiced_status}</td>
                <td>{order.payment_status}</td>
                <td>{order.shipment_date ? new Date(order.shipment_date).toLocaleDateString() : 'N/A'}</td>
                <td>{order.order_status}</td>
                <td>{order.delivery_method || 'N/A'}</td>
            </tr>
        {/each}
    </tbody>
</table>

<div class="pagination">
    <button disabled={currentPage === 1} on:click={() => changePage(currentPage - 1)}>Previous</button>
    <span>Page {currentPage} of {totalPages}</span>
    <button disabled={currentPage === totalPages} on:click={() => changePage(currentPage + 1)}>Next</button>
</div>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    th {
        background-color: #f2f2f2;
    }
    tbody tr:hover {
        background-color: #f5f5f5;
        cursor: pointer;
    }
    .pagination {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pagination button {
        margin: 0 10px;
    }
</style>