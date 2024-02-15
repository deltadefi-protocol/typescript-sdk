import { Asset, UTxO } from '@meshsdk/core';

export type CreateAccountRequest = {
    wallet_address: string;
};

export type SignInRequest = {
    wallet_address: string;
    auth_key: string;
};

export type BuildDepositTransactionRequest = {
    deposit_amount: Asset[];
    input_utxos: Required<UTxO>[];
};

export type SubmitDepositTransactionRequest = {
    signed_tx: string;
};

export type BuildPostOrderTransactionRequest = {
    pair: 'ADAUSDX';
    side: 'buy' | 'sell';
    type: 'limit' | 'market';
    quantity: number;
    price: number;
};
