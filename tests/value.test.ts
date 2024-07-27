// tests/value.test.ts

import { Value } from '../src/value';

describe('Value class', () => {
    it('should add a new asset correctly', () => {
        const value = new Value([]);
        const singleAsset = { currency: "USD", amount: 100 };
        value.addAsset(singleAsset);
        // Assertions to verify the behavior of addAsset...
    });

    // Additional tests...
});