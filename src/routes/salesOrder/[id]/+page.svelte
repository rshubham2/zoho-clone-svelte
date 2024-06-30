<script lang="ts">
    import '$lib/styles/app.css'
    import type { PageData } from './$types';

    export let data: PageData;
    const { salesOrder } = data;
</script>

<h1>Sales Order Details</h1>

<div class="order-details">
    <p><strong>Sales Order #:</strong> {salesOrder.salesorder_number}</p>
    <p><strong>Customer Name:</strong> {salesOrder.customer_name}</p>
    <p><strong>Date:</strong> {new Date(salesOrder.date).toLocaleDateString()}</p>
    <p><strong>Reference #:</strong> {salesOrder.reference_number}</p>
    <p><strong>Amount:</strong> {salesOrder.total}</p>
    <p><strong>Status:</strong> {salesOrder.status}</p>
    <p><strong>Invoiced:</strong> {salesOrder.invoiced_status}</p>
    <p><strong>Payment:</strong> {salesOrder.payment_status}</p>
    <p><strong>Expected Shipment Date:</strong> {salesOrder.shipment_date ? new Date(salesOrder.shipment_date).toLocaleDateString() : 'N/A'}</p>
    <p><strong>Order Status:</strong> {salesOrder.order_status}</p>
    <p><strong>Delivery Method:</strong> {salesOrder.delivery_method || 'N/A'}</p>
</div>

<style>
    .order-details {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
</style>