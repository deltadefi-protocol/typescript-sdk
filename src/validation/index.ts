/* eslint-disable arrow-body-style */
import { Asset } from '@meshsdk/core';
import { DeltaDeFiOrderInfo, DeltaDeFiTxInfo } from '../types/validation';

/**
 * Todo: Implement the function parseCurrentTxInfo.
 * This function should parse the transaction information from the given transaction hex string.
 * @param txHex
 * @returns
 */
export const parseCurrentTxInfo = (txHex: string): DeltaDeFiTxInfo => {
    console.log('txHex', txHex);

    return {
        accountInput: [],
        accountOutput: [],
        dexInput: [],
        dexOutput: [],
    };
};

/**
 * Todo: Implement the function txAccountNetInflow.
 * This function should calculate the net inflow of the account from the given transaction information.
 * @param txInfo
 * @returns
 */
export const txAccountNetInflow = (txInfo: DeltaDeFiTxInfo): Asset[] => {
    return [];
};

export const txOrderInfo = (txInfo: DeltaDeFiTxInfo): DeltaDeFiOrderInfo => {
    return {
        assetsToPay: [],
        assetsToReturn: [],
        txFee: '0',
        tradingFee: '0',
    };
};
