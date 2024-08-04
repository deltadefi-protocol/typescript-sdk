/* eslint-disable arrow-body-style */
import { Asset } from '@meshsdk/core';
import { DeltaDeFiOrderInfo, DeltaDeFiTxInfo } from '../types/validation';
import { Value } from '../types/value';

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
 * Incl all activities related to user account e.g. deposit, withdraw
 * Does account output and inflow include txfee already?
 * @param txInfo
 * @returns
 */
export const txAccountNetInflow = (txInfo: DeltaDeFiTxInfo): Record<string, bigint> => {
    // Calculate account netinflow
    let accountnetinflow = new Value();
    // Add account output assets
    txInfo.accountOutput.forEach((asset) => {
        accountnetinflow = accountnetinflow.addAssets([asset]);
    });
    // Subtract account input assets
    txInfo.accountInput.forEach((asset) => {
        accountnetinflow = accountnetinflow.negateAssets([asset]);
    });
    return accountnetinflow.toRecord();
};

/**
 * Todo: Implement the function txDexNetInflow.
 * This function should calculate the net inflow of the DEX from the given transaction information.
 * Incl. the 2 order fields in tx info --> focusing on order only
 * @param txInfo
 * @returns
 */

export const txDexNetInflow = (order: DeltaDeFiOrderInfo): Record<string, bigint> => {
    // Calculate dex netinflow
    let dexnetinflow = new Value();
    // Add assetsToReturn
    order.assetsToReturn.forEach((asset) => {
        dexnetinflow = dexnetinflow.addAssets([asset]);
    });
    // Subtract assetsToPay
    order.assetsToPay.forEach((asset) => {
        dexnetinflow = dexnetinflow.negateAssets([asset]);
    });
    // Subtract txFee and tradingFee assuming their units are in ADA
    const adaFee = order.txFee + order.tradingFee;
    dexnetinflow = dexnetinflow.negateAssets([{ unit: 'ADA', quantity: adaFee }]);
    return dexnetinflow.toRecord();
};
