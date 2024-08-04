import { Asset } from '@meshsdk/core';
import { Value } from '../src/types';
import { DeltaDeFiOrderInfo, DeltaDeFiTxInfo } from '../src/types/validation';
import { txAccountNetInflow, txDexNetInflow } from '../src/validation';

describe('txAccountNetInflow', () => {
    it('should return the net inflow of the account from the given transaction information', () => {
        const txInfo: DeltaDeFiTxInfo = {
            accountInput: [
                { unit: 'ETH', quantity: '100' },
                { unit: 'DAI', quantity: '200' },
            ],
            accountOutput: [
                { unit: 'ETH', quantity: '50' },
                { unit: 'DAI', quantity: '100' },
            ],
            dexInput: [],
            dexOutput: [],
        };

        const result = txAccountNetInflow(txInfo);
        expect(result).toEqual({ ETH: -50n, DAI: -100n });
    });
});

describe('txDexNetInflow', () => {
    it('should return the net inflow of the DEX from the given transaction information', () => {
        const order: DeltaDeFiOrderInfo = {
            assetsToPay: [
                { unit: 'ETH', quantity: '100' },
                { unit: 'DAI', quantity: '200' },
            ],
            assetsToReturn: [
                { unit: 'ETH', quantity: '50' },
                { unit: 'DAI', quantity: '100' },
            ],
            txFee: '10',
            tradingFee: '5',
        };

        const result = txDexNetInflow(order);
        expect(result).toEqual({ ETH: 50n, DAI: 100n });
    });
});
