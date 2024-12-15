/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import { ApiClient } from '../src';

dotenv.config();

const skipApiTests = process.env.SKIP_API_TESTS === 'true';
const wallet_address = process.env.WALLET_ADDRESS || '';
const x_api_key = process.env.X_API_KEY || '';
const apiKey = process.env.API_KEY || '';

describe('Account APIs', () => {
    test('Sign In', async () => {
        if (skipApiTests) return;
        const api = new ApiClient({ network: 'preprod' });
        const res = await api.accounts.signIn({ wallet_address, x_api_key });
        expect(res.token).not.toBe('');
    });
    test('Get Orders', async () => {
        if (skipApiTests) return;
        const api = new ApiClient({ apiKey, network: 'preprod' });
        const res = await api.accounts.getOrderRecords();
        console.log(res);
    });
});
