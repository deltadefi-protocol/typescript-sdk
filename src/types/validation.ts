import { Asset } from '@meshsdk/core';

/**
 * DeltaDeFiOrderInfo is a type that represents the information of a DeltaDeFi order.
 * @property {Asset[]} assetsToPay - The assets that are to be paid from orders in current transaction.
 * @property {Asset[]} assetsToReturn - The assets that are to be received from orders in current transaction.
 * @property {string} txFee - The transaction fee.
 * @property {string} tradingFee - The trading fee.
 */

export type DeltaDeFiOrderInfo = {
    assetsToPay: Asset[];
    assetsToReturn: Asset[];
    txFee: string;
    tradingFee: string;
};

/**
 * DeltaDeFiTxInfo is a type that represents the information of a DeltaDeFi transaction.
 * @property {Asset[]} accountInput - The assets that are input from the account.
 * @property {Asset[]} accountOutput - The assets that are output to the account.
 * @property {Asset[]} dexInput - The assets that are input from the DEX.
 * @property {Asset[]} dexOutput - The assets that are output to the DEX.
 * @property {string} txFee - The transaction fee.
 * @property {string} tradingFee - The trading fee.
 */
export type DeltaDeFiTxInfo = {
    accountInput: Asset[];
    accountOutput: Asset[];
    dexInput: DeltaDeFiOrderInfo[];
    dexOutput: DeltaDeFiOrderInfo[];
};
