import { DeepVueCreditReportResponse } from '../types/creditReport';

const API_BASE_URL = "https://production.deepvue.tech/v2/financial-services/credit-bureau/credit-report/sdk/report";

export const fetchCreditReport = async (transactionId: string): Promise<DeepVueCreditReportResponse> => {
    const token = (import.meta as any).env.VITE_DEEPVUE_ACCESS_TOKEN || '';
    const apiKey = (import.meta as any).env.VITE_DEEPVUE_API_KEY || '';

    if (!token || !apiKey) {
        console.warn("DeepVue API credentials are missing in environment variables.");
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("x-api-key", apiKey);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow' as RequestRedirect
    };

    try {
        const response = await fetch(`${API_BASE_URL}?transaction_id=${transactionId}`, requestOptions);
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        const result = await response.json();
        return result as DeepVueCreditReportResponse;
    } catch (error) {
        console.error('Error fetching credit report:', error);
        throw error;
    }
};
