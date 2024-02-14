import { Asset, TxInParameter } from '@meshsdk/core';

export type CreateAccountRequest = {
    wallet_address: string;
};

export type SignInRequest = {
    wallet_address: string;
    auth_key: string;
};

export type BuildDepositTransactionRequest = {
    deposit_amount: Asset[];
    input_utxos: Required<TxInParameter>[];
};

export type SubmitDepositTransactionRequest = {
    signed_tx: string;
};
