import { Asset, UTxO } from '@meshsdk/core';
import { TradingPair, TradingSide, TradingType } from '../constant';

export type SignInRequest = {
    wallet_address: string;
    auth_key: string;
};

export type BuildSendRefScriptsTransactionRequest = {
    input_utxos: Required<UTxO>[];
};

export type SubmitSendRefScriptsTransactionRequest = {
    signed_tx: string;
};

export type BuildDepositTransactionRequest = {
    deposit_amount: Asset[];
    input_utxos: Required<UTxO>[];
};

export type SubmitDepositTransactionRequest = {
    signed_tx: string;
};

export type BuildWithdrawalTransactionRequest = {
    withdrawal_amount: Asset[];
    input_utxos: Required<UTxO>[];
};

export type SubmitWithdrawalTransactionRequest = {
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

export type GetMarketPriceRequest = {
    pair: string;
};

export type Interval = '15m' | '30m' | '1h' | '1d' | '1w' | '1M';

export type GetAggregatedPriceRequest = {
    pair: string;
    interval: Interval;
    start?: number; // timestamp
    end?: number; // timestamp
};
