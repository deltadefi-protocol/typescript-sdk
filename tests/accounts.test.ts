/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import { ApiClient } from '../src';

dotenv.config();

const skipApiTests = process.env.SKIP_API_TESTS === 'true';
const wallet_address = process.env.WALLET_ADDRESS || '';
const apiKey = process.env.API_KEY || '';

describe('Account APIs', () => {
    test('Sign In', async () => {
        if (skipApiTests) return;
        const api = new ApiClient({ apiKey, network: 'preprod' });
        const res = await api.accounts.signIn({
            x_api_key: apiKey,
            wallet_address,
        });
        expect(res.token).not.toBe('');
    });
    test('Get Orders', async () => {
        if (skipApiTests) return;
        const api = new ApiClient({ apiKey, network: 'preprod' });
        const res = await api.accounts.getOrderRecords({ status: 'openOrder' });
        console.log(res);
    });
});
