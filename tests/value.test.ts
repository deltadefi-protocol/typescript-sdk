// tests/value.test.ts
import { Asset } from '@meshsdk/core';
import { Value } from '../src/types';

describe('Value class', () => {
    describe('addAsset', () => {
        it('should add a new asset correctly', () => {
            const value = new Value([]);
            const singleAsset: Asset = { unit: 'USD', quantity: '100' };
            value.addAsset(singleAsset);
            // Assertions to verify the behavior of addAsset...
            expect(value.value).toEqual({ USD: BigInt(100) });
        });
    });

    // Additional tests...
});
