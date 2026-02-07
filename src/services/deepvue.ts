const BASE_URL = 'https://production.deepvue.tech/v2/financial-services/credit-bureau';
const AUTH_URL = 'https://production.deepvue.tech/v1/authorize';

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

const getAccessToken = async (): Promise<string> => {
    // Return cached token if still valid (with 5 min buffer)
    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry - 300000) {
        return cachedToken;
    }

    const clientId = import.meta.env.VITE_DEEPVUE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_DEEPVUE_API_KEY;

    if (!clientId || !clientSecret) {
        throw new Error('Missing Deepvue Credentials');
    }

    try {
        const body = new URLSearchParams();
        body.append('client_id', clientId);
        body.append('client_secret', clientSecret);
        body.append('grant_type', 'client_credentials');

        const response = await fetch(AUTH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Auth Error Body:', errorText);
            throw new Error(`Auth Failed: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        // Assuming response structure: { access_token: "...", expires_in: 3600 }
        cachedToken = data.access_token;
        if (data.expires_in) {
            tokenExpiry = Date.now() + (data.expires_in * 1000);
        } else {
            tokenExpiry = Date.now() + (3600 * 1000); // Default 1 hour
        }

        return cachedToken as string;
    } catch (error) {
        console.error('Failed to get access token:', error);
        // Fallback: If auth fails, incorrectly try using Client ID as token (matches previous behavior, just in case)
        console.warn('Falling back to Client ID as token');
        return clientId;
    }
};

const getCommonHeaders = (token: string, apiKey: string) => {
    return {
        'Authorization': `Bearer ${token}`,
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
    };
};

export const initiateCreditSession = async (data: {
    redirect_uri: string;
    full_name: string;
    mobile_number: string;
}) => {
    try {
        const token = await getAccessToken();
        const apiKey = import.meta.env.VITE_DEEPVUE_API_KEY;

        const response = await fetch(`${BASE_URL}/equifax/credit-report/sdk/session`, {
            method: 'POST',
            headers: getCommonHeaders(token, apiKey),
            body: JSON.stringify({
                ...data,
                enrich: true
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error initiating session:', error);
        throw error;
    }
};

export const fetchCreditReport = async (transactionId: string) => {
    try {
        const token = await getAccessToken();
        const apiKey = import.meta.env.VITE_DEEPVUE_API_KEY;

        // Construct URL with query parameters
        const url = new URL(`${BASE_URL}/credit-report/sdk/report`);
        url.searchParams.append('transaction_id', transactionId);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: getCommonHeaders(token, apiKey)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching report:', error);
        throw error;
    }
};
