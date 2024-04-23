/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import { ApiClient } from '../src';

dotenv.config();

const wallet_address = process.env.WALLET_ADDRESS || '';
const baseURL = process.env.BASE_URL || 'http://localhost:8080';
const auth_key = process.env.AUTH_KEY || '';
const apiKey = process.env.API_KEY || '';

describe('Account APIs', () => {
    test('Sign In', async () => {
        const api = new ApiClient(baseURL, {});
        const res = await api.accounts.signIn({ wallet_address, auth_key });
        expect(res.token).not.toBe('');
    });
});
