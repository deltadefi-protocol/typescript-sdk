/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import { AppWalletKeyType } from '@meshsdk/core';
import { ApiClient } from '../src';

dotenv.config();

const apiKey = process.env.API_KEY || '';

const signingKey: AppWalletKeyType = {
    type: 'mnemonic',
    words: (process.env.MNEMONIC || '').split(',') || [],
};

describe('Orders APIs', () => {
    test('Orders should be successfully placed and cancelled programmatically', async () => {
        const api = new ApiClient({ apiKey, signingKey, network: 'preprod' });
        const buildRes = await api.orders.buildPostOrderTransaction({
            pair: 'ADAUSDX',
            side: 'sell',
            type: 'limit',
            quantity: 1000_000_000,
            price: 0.62,
        });
        console.log('build order response', buildRes);
        const unsignedTxs = buildRes.tx_hexes;
        const signedTxs = api.wallet!.signTxs(unsignedTxs);

        console.log('signed txs', signedTxs);

        const res = await api.orders.submitPostOrderTransactionRequest({
            order_id: buildRes.order_id,
            signed_txs: signedTxs,
        });

        console.log('response', res);

        const cancelRes = await api.orders.cancelOrder(buildRes.order_id);
        console.log('cancel order response', cancelRes);
    });

    test('Orders should be successfully placed and cancelled programmatically in one api', async () => {
        const api = new ApiClient({ apiKey, signingKey, network: 'preprod' });
        const buildRes = await api.postOrder({
            pair: 'ADAUSDX',
            side: 'sell',
            type: 'limit',
            quantity: 1000_000_000,
            price: 0.62,
        });

        const cancelRes = await api.orders.cancelOrder(buildRes.order.order_id);
        console.log('cancel order response', cancelRes);
    });
});
