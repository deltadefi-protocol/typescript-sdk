/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import { ApiClient } from '../src';

dotenv.config();

const skipApiTests = process.env.SKIP_API_TESTS === 'true';
const apiKey = process.env.API_KEY || '';

describe('Account APIs', () => {
    // Note: signIn is for frontend web app only.
    // SDK users authenticate via X-API-KEY header automatically.

    test('Get Open Orders', async () => {
        if (skipApiTests) return;
        const api = new ApiClient({ apiKey, network: 'preprod' });
        const res = await api.accounts.getOpenOrders({ symbol: 'ADAUSDM' });
        expect(res).toHaveProperty('data');
        expect(res).toHaveProperty('total_count');
        expect(res).toHaveProperty('total_page');
        console.log('Open orders:', res);
    });

    test('Get Account Balance', async () => {
        if (skipApiTests) return;
        const api = new ApiClient({ apiKey, network: 'preprod' });
        const res = await api.accounts.getAccountBalance();
        expect(Array.isArray(res)).toBe(true);
        console.log('Account balance:', res);
    });
});
