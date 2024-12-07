import { Asset } from '@meshsdk/core';
import { OrderJSON } from '../models/order';

export type SignInResponse = {
    token: string;
    is_ready: boolean;
};

// export type BuildSendRefScriptsTransactionResponse = {
//     tx_hex: string;
// };

// export type SubmitSendRefScriptsTransactionResponse = {
//     tx_hash: string;
// };

// export type PostOrderResponse = SubmitPostOrderTransactionResponse;

// export type GetAccountInfoResponse = {
//     api_key: string;
//     api_limit: string;
//     created_at: string;
//     updated_at: string;
//     wallet_address: string;
//     is_ready: boolean;
// };

// export type BuildDeleteAccountTransactionResponse = {
//     tx_hex: string;
// };

// export type SubmitDeleteAccountTransactionResponse = {
//     tx_hash: string;
// };

export type TransactionStatus =
    | 'building'
    | 'held_for_order'
    | 'submitted'
    | 'submission_failed'
    | 'confirmed';

type DepositRecord = {
    created_at: string;
    status: TransactionStatus;
    assets: Asset[];
    tx_hash: string;
};

export type GetDepositRecordsResponse = DepositRecord[];

export type GetOrderRecordResponse = {
    Orders: OrderJSON[];
};

type WithdrawalRecord = {
    created_at: string;
    assets: Asset[];
};

export type GetWithdrawalRecordsResponse = WithdrawalRecord[];

type AssetBalance = {
    asset: string;
    free: bigint;
    locked: bigint;
};

export type GetAccountBalanceResponse = AssetBalance[];

export type GenerateNewAPIKeyResponse = {
    api_key: string;
};

export type BuildDepositTransactionResponse = {
    tx_hex: string;
};

export type BuildWithdrawalTransactionResponse = {
    tx_hex: string;
};

export type SubmitDepositTransactionResponse = {
    tx_hash: string;
};

export type SubmitWithdrawalTransactionResponse = {
    tx_hash: string;
};

export type GetTermsAndConditionResponse = {
    value: string;
};

export type MarketDepth = {
    price: number;
    quantity: number;
};

export type GetMarketDepthResponse = {
    bids: MarketDepth[];
    asks: MarketDepth[];
};

export type GetMarketPriceResponse = {
    price: number;
};

export type Trade = {
    time: string;
    symbol: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
};

export type GetAggregatedPriceResponse = Trade[];

export type BuildPlaceOrderTransactionResponse = {
    order_id: string;
    tx_hex: string;
};

export type BuildCancelOrderTransactionResponse = {
    tx_hex: string;
};

export type SubmitPlaceOrderTransactionResponse = {
    order: OrderJSON;
};

export type SubmitCancelOrderTransactionResponse = {
    txhash: string;
};
