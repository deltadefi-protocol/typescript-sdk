import { Asset, UTxO } from '@meshsdk/core';
import { TradingSymbol, OrderSide, OrderType } from '../models/order';

// SignInRequest to be refactored
export type SignInRequest = {
    wallet_address: string;
    x_api_key: string;
};

// export type BuildSendRefScriptsTransactionRequest = {
//     input_utxos: Required<UTxO>[];
//     total_deposit_amount: Asset[];
// };

// export type SubmitSendRefScriptsTransactionRequest = {
//     signed_tx: string;
// };

// type MarketDepth = {
//     price: number;
//     quantity: number;
// };

// export type SubmitDeleteAccountTransactionRequest = {
//     signed_tx: string;
// };

export type BuildDepositTransactionRequest = {
    deposit_amount: Asset[];
    input_utxos: UTxO[];
};

export type BuildWithdrawalTransactionRequest = {
    withdrawal_amount: Asset[];
};

export type SubmitDepositTransactionRequest = {
    signed_tx: string;
};

export type SubmitWithdrawalTransactionRequest = {
    signed_txs: string[];
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
    pair: TradingSymbol;
    side: OrderSide;
    type: OrderType;
    quantity: number;
    price?: number;
    basis_point?: number;
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
