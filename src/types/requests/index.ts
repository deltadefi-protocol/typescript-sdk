/* eslint-disable import/no-extraneous-dependencies */
import { Asset, TxInParameter } from '@meshsdk/core';

export type CreateAccountRequest = {
    wallet_address: string;
};

export type SignInRequest = {
    wallet_address: string;
};

export type BuildDepositTransactionRequest = {
    deposit_amount: Asset[];
    input_utxos: TxInParameter[];
};

export type SubmitDepositTransactionRequest = {
    signed_tx: string;
};
