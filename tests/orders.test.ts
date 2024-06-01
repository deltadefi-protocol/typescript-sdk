/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import { AppWalletKeyType } from '@meshsdk/core';
import { ApiClient } from '../src';

dotenv.config();

const baseURL = process.env.BASE_URL || 'http://localhost:8080';
const apiKey = process.env.API_KEY || '';

const signingKey: AppWalletKeyType = {
    type: 'mnemonic',
    words: (process.env.MNEMONIC || '').split(',') || [],
};

describe('GetDepthResponse', () => {
    test('Buying price should have correct data format and non-negative vaule', async () => {
        const api = new ApiClient(baseURL, { apiKey, signingKey });
        const buildRes = await api.orders.buildPostOrderTransaction({
            pair: 'ADAUSDX',
            side: 'sell',
            type: 'limit',
            quantity: 1000_000_000,
            price: 0.62,
        });
        console.log('build order response', buildRes);
        const unsignedTxs = buildRes.tx_hexes;
        const signedTxs = await api.wallet!.signTxs(unsignedTxs);

        console.log('signed txs', signedTxs);

        const res = await api.orders.submitPostOrderTransactionRequest({
            order_id: buildRes.order_id,
            signed_txs: signedTxs,
        });

        console.log('response', res);
    });
});
