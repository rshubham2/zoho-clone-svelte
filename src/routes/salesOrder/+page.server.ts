import type { PageServerLoad } from './$types';
import type { SalesOrder } from '$lib/types';
import { redirect } from '@sveltejs/kit'

interface ZohoResponse {
    salesorders: SalesOrder[];
    page_context: {
        page: number;
        per_page: number;
        has_more_page: boolean;
        report_name: string;
        applied_filter: string;
        sort_column: string;
        sort_order: string;
    };
}

async function getToken(fetch: typeof globalThis.fetch): Promise<string> {
    const tokenResponse = await fetch('/api/zohoAuthToken');
    const { token } = await tokenResponse.json();
    return token;
}

export const load: PageServerLoad = async ({ fetch, url, locals }) => {
      // redirect user if not logged in
        if (!locals.user) {
            redirect(302, '/login')
        }
    const token = await getToken(fetch);
    const page = Number(url.searchParams.get('page')) || 1;
    const perPage = 10; // You can adjust this or make it dynamic

    const response = await fetch(`https://www.zohoapis.in/books/v3/salesorders?organization_id=60005679410&page=${page}&per_page=${perPage}`, {
        headers: {
            'Authorization': `Zoho-oauthtoken ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ZohoResponse = await response.json();

    return {
        orders: data.salesorders,
        currentPage: page,
        totalPages: Math.ceil(data.page_context.has_more_page ? (page * perPage + 1) / perPage : page)
    };
};