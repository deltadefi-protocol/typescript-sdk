/* eslint-disable arrow-body-style */
import { Asset } from '@meshsdk/core';
import { DeltaDeFiOrderInfo, DeltaDeFiTxInfo } from '../types/validation';
// import { Value } from '../src/types/responses';

// /**
//  * Todo: Implement the function parseCurrentTxInfo.
//  * This function should parse the transaction information from the given transaction hex string.
//  * @param txHex
//  * @returns
//  */
// export const parseCurrentTxInfo = (txHex: string): DeltaDeFiTxInfo => {
//     console.log('txHex', txHex);
//     return Value.parseTxHex(txHex);
// };

// /**
//  * Todo: Implement the function txAccountNetInflow.
//  * This function should calculate the net inflow of the account from the given transaction information.
//  * @param txInfo
//  * @returns
//  */
// export const txAccountNetInflow = (txInfo: DeltaDeFiTxInfo): Asset[] => {
//     const inflow = Value.calculateInflow(txInfo);
//     const outflow = Value.calculateOutflow(txInfo);
//     return inflow.map((asset, index) => ({
//         ...asset,
//         amount: asset.amount - (outflow[index]?.amount || 0),
//     }));
// };

// /**
//  * Todo: Implement the function txDexNetInflow.
//  * This function should calculate the net inflow of the DEX from the given transaction information.
//  * @param txInfo
//  * @returns
//  */

// export const txOrderInfo = (txInfo: DeltaDeFiTxInfo): DeltaDeFiOrderInfo => {
//     return {
//         assetsToPay: [],
//         assetsToReturn: [],
//         txFee: '0',
//         tradingFee: '0',
//     };
// };
