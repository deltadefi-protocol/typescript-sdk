import { Asset, UTxO } from '@meshsdk/core';
import { TradingPair, TradingSide, TradingType } from '../constant';

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
    pair: TradingPair;
    side: TradingSide;
    type: TradingType;
    quantity: number;
    price: number;
};

export type SubmitPostOrderTransactionRequest = {
    order_id: string;
    signed_txs: string[];
};

export type GetDepthRequest = {
    pair: string;
};

type MarketDepth = {
    price: number;
    quantity: number;
};

export type GetDepthResponse = {
    bids: MarketDepth[];
    asks: MarketDepth[];
};
