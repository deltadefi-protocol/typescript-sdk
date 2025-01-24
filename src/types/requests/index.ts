import { Asset, UTxO } from '@meshsdk/core';
import { TradingSymbol, OrderSide, OrderType } from '../models/order';

// SignInRequest to be refactored
export type SignInRequest = {
    x_api_key: string;
    wallet_address: string;
};

// type MarketDepth = {
//     price: number;
//     quantity: number;
// };

export type BuildDepositTransactionRequest = {
    deposit_amount: Asset[];
    input_utxos: UTxO[];
};

export type SubmitDepositTransactionRequest = {
    signed_tx: string;
};

export type BuildWithdrawalTransactionRequest = {
    withdrawal_amount: Asset[];
};

export type SubmitWithdrawalTransactionRequest = {
    signed_tx: string;
};

export type GetMarketDepthRequest = {
    pair: TradingSymbol;
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

export type BuildPlaceOrderTransactionRequest = {
    symbol: TradingSymbol;
    side: OrderSide;
    type: OrderType;
    quantity: number;
    price?: number;
    max_slippage_basis_point?: number;
};

export type PostOrderRequest = BuildPlaceOrderTransactionRequest;

export type SubmitPlaceOrderTransactionRequest = {
    order_id: string;
    signed_tx: string;
};

export type BuildCancelOrderTransactionRequest = {
    order_id: string;
};

export type SubmitCancelOrderTransactionRequest = {
    signed_tx: string;
};
