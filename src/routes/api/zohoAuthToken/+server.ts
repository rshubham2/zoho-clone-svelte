// src/routes/api/zoho-token/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const REFRESH_TOKEN = '1000.94fccafc2fd7f57ea21eee0f8cdd7955.fd557182781a6dc4059361c7bd66e041';
const CLIENT_ID = '1000.KXTGP1GAGIDX12Q294C6OIMVR60VMX';
const CLIENT_SECRET = 'bb44b083c2b29eb4eefd1a605266a866fcd5f491fb';
const REDIRECT_URI = 'https://www.google.com/';

let authToken: string | null = null;
let tokenExpiry = 0;

interface TokenResponse {
    access_token: string;
    expires_in: number;
}

async function refreshToken(): Promise<void> {
    const response = await fetch('https://accounts.zoho.in/oauth/v2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            refresh_token: REFRESH_TOKEN,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: 'refresh_token'
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TokenResponse = await response.json();
    authToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in * 1000);
}

export const GET: RequestHandler = async () => {
    // If token is expired or will expire in the next 5 minutes, refresh it
    if (!authToken || Date.now() > tokenExpiry - 300000) {
        await refreshToken();
    }

    return json({ token: authToken });
};