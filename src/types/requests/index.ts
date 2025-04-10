import { UTxO } from '@meshsdk/core';
import { TradingSymbol, OrderSide, OrderType } from '../models/order';

// SignInRequest to be refactored
export type SignInRequest = {
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

export type GetMarketDepthRequest = {
    symbol: TradingSymbol;
};

export type GetMarketPriceRequest = {
    symbol: TradingSymbol;
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
    limit_slippage?: boolean;
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

export type Status = 'open' | 'closed';

export type GetOrderRecordRequest = {
    status?: Status;
};
