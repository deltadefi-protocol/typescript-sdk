/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import { ApiClient } from '../src';

dotenv.config();

const wallet_address = process.env.WALLET_ADDRESS || '';
const auth_key = process.env.AUTH_KEY || '';
const apiKey = process.env.API_KEY || '';

describe('Account APIs', () => {
    test('Sign In', async () => {
        const api = new ApiClient({ network: 'preprod' });
        const res = await api.accounts.signIn({ wallet_address, auth_key });
        expect(res.token).not.toBe('');
    });
    test('Get Orders', async () => {
        const api = new ApiClient({ apiKey, network: 'preprod' });
        const res = await api.accounts.getOrders();
        console.log(res);
    });
});
