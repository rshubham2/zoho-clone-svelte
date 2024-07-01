
export interface SalesOrder {
    date: string;
    salesorder_number: string;
    customer_name: string;
    reference_number: string;
    total: number;
    status: string;
    invoiced_status: string;
    payment_status: string;
    shipment_date: string | null;
    order_status: string;
    delivery_method: string | null;
    salesorder_id: string;
}