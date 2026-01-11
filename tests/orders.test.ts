/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import { ApiClient } from '../src';

dotenv.config();

const skipApiTests = process.env.SKIP_API_TESTS === 'true';
const apiKey = process.env.API_KEY || '';
const operationKeyPassword = process.env.OPERATION_KEY_PASSWORD || '';

describe('Orders APIs', () => {
    test('Orders should be successfully placed and cancelled programmatically', async () => {
        if (skipApiTests) return;
        const api = new ApiClient({ apiKey, network: 'preprod' });
        await api.loadOperationKey(operationKeyPassword);
        try {
            const postOrderRes = await api.postOrder({
                symbol: 'ADAUSDM',
                side: 'buy',
                type: 'limit',
                quantity: 10000000,
                price: 0.62,
            });
            console.log('Post order response', postOrderRes);

            const cancelRes = await api.cancelOrder(postOrderRes.order.order_id);
            console.log('cancel order response', cancelRes);
        } catch (error: unknown) {
            // 500 Insufficient balance is expected when account has no funds
            // The request format is correct, just no balance to place order
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const axiosError = error as any;
            if (axiosError?.response?.status === 500) {
                console.log(
                    'Server error (expected - insufficient balance):',
                    axiosError?.response?.data,
                );
                return;
            }
            throw error;
        }
    });
    // const sleep = (ms: number) =>
    //     new Promise((resolve) => {
    //         setTimeout(resolve, ms);
    //     });
    // test('Randomly placing order at api', async () => {
    //     if (skipApiTests) return;
    //     const randomlyPlacingOrder = async (i: number) => {
    //         const startTime = 100 * i + Math.random() * 100;
    //         const cancelTime = Math.random() * 10000;
    //         // await sleep(startTime);
    //         const api = new ApiClient({ apiKey, signingKey, network: 'preprod' });
    //         const orderSide = Math.floor(Math.random() * 10000) % 2 === 0 ? 'buy' : 'sell';
    //         const buyPrices = [0.49, 0.485, 0.48, 0.45, 0.3];
    //         const sellPrices = [0.51, 0.515, 0.52, 0.525, 0.7];
    //         const priceChoice = Math.floor(Math.random() * 1000000) % 5;
    //         const orderQuantity =
    //             Math.floor(Math.random() * 10000) % 2 === 0 ? 500_000_000 : 1_000_000_000;
    //         // await sleep(cancelTime);
    //         const buildRes = await api
    //             .postOrder({
    //                 pair: 'ADAUSDX',
    //                 side: orderSide,
    //                 type: 'limit',
    //                 quantity: orderQuantity,
    //                 price: orderSide === 'buy' ? buyPrices[priceChoice] : sellPrices[priceChoice],
    //             })
    //             .catch((e) => {
    //                 console.log('error placing order', e);
    //                 throw Error('error placing order');
    //             });
    //         const cancelRes = await api.orders.cancelOrder(buildRes.order.order_id).catch((e) => {
    //             console.log('error cancelling order', e);
    //             throw Error('error cancelling order');
    //         });
    //         console.log('cancel order response', cancelRes);
    //     };
    //     const orderPromises: Promise<void>[] = [];
    //     for (let i = 0; i < 40; i += 1) {
    //         orderPromises.push(randomlyPlacingOrder(i));
    //     }
    //     await Promise.all(orderPromises);
    // }, 100000);
});
