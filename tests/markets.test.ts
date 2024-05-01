/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import { ApiClient } from '../src';
import { GetDepthResponse, MarketDepth } from '../src/types';
import { GetMarketPriceResponse } from '../src/types';

dotenv.config();

const wallet_address = process.env.WALLET_ADDRESS || '';
const baseURL = process.env.BASE_URL || 'http://localhost:8080';
const auth_key = process.env.AUTH_KEY || '';
const apiKey = process.env.API_KEY || '';

describe('GetDepthResponse', () => {
    test('should have correct structure and non-negative values', async () => {
        const api = new ApiClient(baseURL, { apiKey });
        const res = await api.markets.getDepth({ pair: 'ADAUSDX' });

        console.log('response', res);

        // Check that bids and asks are arrays
        expect(Array.isArray(res.bids)).toBe(true);
        expect(Array.isArray(res.asks)).toBe(true);

        // Check that each bid and ask is a MarketDepth object
        res.bids.forEach((bid: MarketDepth) => {
            expect(typeof bid.price).toBe('number');
            expect(bid.price).toBeGreaterThanOrEqual(0);
            expect(typeof bid.quantity).toBe('number');
            expect(bid.quantity).toBeGreaterThanOrEqual(0);
        });
        res.asks.forEach((ask: MarketDepth) => {
            expect(typeof ask.price).toBe('number');
            expect(ask.price).toBeGreaterThanOrEqual(0);
            expect(typeof ask.quantity).toBe('number');
            expect(ask.quantity).toBeGreaterThanOrEqual(0);
        });
    });
});

describe('GetMarketPriceRequest', () => {
    test('Buying price should have correct data format and non-negative vaule', async () => {
        const api = new ApiClient(baseURL, { apiKey });
        const res = await api.markets.getMarketPrice({ pair: 'ADAUSDX', side: 'buy' });

        console.log('response', res);

        // Check that buying price is a number
        expect(typeof res.price).toBe('number');

        // Check that buying price is non-negative
        expect(res.price).toBeGreaterThanOrEqual(0);
    });
    test('Selling price should have correct data format and non-negative vaule', async () => {
        const api = new ApiClient(baseURL, { apiKey });
        const res = await api.markets.getMarketPrice({ pair: 'ADAUSDX', side: 'sell' });

        console.log('response', res);

        // Check that selling price is a number
        expect(typeof res.price).toBe('number');

        // Check that selling price is non-negative
        expect(res.price).toBeGreaterThanOrEqual(0);
    });
});
