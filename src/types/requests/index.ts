import { UTxO } from '@meshsdk/core';
import { TradingSymbol, OrderSide, OrderType } from '../models/order';

// SignInRequest to be refactored
export type SignInRequest = {
    x_api_key: string;
    wallet_address: string;
    encrypted_operation_key?: string;
    operation_key_hash?: string;
    is_script_operation_key?: boolean;
};

// type MarketDepth = {
//     price: number;
//     quantity: number;
// };

export type Asset = {
    unit: string;
    quantity: string;
};

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

export type BuildTransferalTransactionRequest = {
    transferal_amount: Asset[];
    to_address: string;
};

export type SubmitTransferalTransactionRequest = {
    signed_tx: string;
};

export type BuildTransferalRequestTransactionRequest = {
    transferal_amount: Asset[];
    from_address: string;
};

export type SubmitTransferalRequestTransactionRequest = {
    signed_tx: string;
};

// export type GetMarketDepthRequest = {
//     symbol: TradingSymbol;
// };

export type GetMarketPriceRequest = {
    symbol: TradingSymbol;
};

export type Interval = '5m' | '15m' | '30m' | '1h' | '1d';

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
    limit_slippage?: boolean;
};

export type PostOrderRequest = BuildPlaceOrderTransactionRequest;

export type SubmitPlaceOrderTransactionRequest = {
    order_id: string;
    signed_tx: string;
};

export type SubmitCancelOrderTransactionRequest = {
    signed_tx: string;
};

export type Status = 'openOrder' | 'orderHistory' | 'tradingHistory';

export type GetOrderRecordRequest = {
    status: Status; // Must be either 'openOrder' | 'orderHistory' | 'tradingHistory'
    limit?: number; // default number is 10 while number must be between 1 and 250
    page?: number; // default number is 1 while number must be between 1 and 1000
};
