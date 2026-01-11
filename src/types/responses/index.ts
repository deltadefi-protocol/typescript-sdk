import { OrderResponse, AccountBalance, OrderExecutionRecordResponse, TransferalRecord } from '../models';

/**
 * @deprecated This response is for frontend web app only. SDK users should use X-API-KEY authentication instead.
 */
export type SignInResponse = {
    user_id: string;
    token: string;
    is_first_time: boolean;
    is_onboarding_ready: boolean;
};

export type GetOperationKeyResponse = {
    encrypted_operation_key: string;
    operation_key_hash: string;
};

// export type BuildSendRefScriptsTransactionResponse = {
//     tx_hex: string;
// };

// export type SubmitSendRefScriptsTransactionResponse = {
//     tx_hash: string;
// };

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

export type TransactionStatus = 'building' | 'submitted' | 'submission_failed' | 'confirmed';

export type AssetRecord = {
    asset: string;
    asset_unit: string;
    qty: string;
};

export type DepositRecord = {
    created_at: string;
    status: TransactionStatus;
    assets: AssetRecord[];
    tx_hash: string;
};

export type PaginatedResponse<T> = {
    data: T[];
    total_count: number;
    total_page: number;
};

export type GetDepositRecordsResponse = PaginatedResponse<DepositRecord>;

export type GetOpenOrdersResponse = PaginatedResponse<OrderResponse>;

export type GetTradeOrdersResponse = PaginatedResponse<OrderResponse>;

export type GetTradesResponse = PaginatedResponse<OrderExecutionRecordResponse>;

export type GetOrderByIdResponse = {
    order: OrderResponse;
};

export type WithdrawalRecord = {
    created_at: string;
    status: TransactionStatus;
    assets: AssetRecord[];
};

export type GetWithdrawalRecordsResponse = PaginatedResponse<WithdrawalRecord>;

export type GetAccountBalanceResponse = AccountBalance[];

export type GenerateNewAPIKeyResponse = {
    api_key: string;
    created_at: string;
};

export type BuildDepositTransactionResponse = {
    tx_hex: string;
};

export type BuildWithdrawalTransactionResponse = {
    tx_hex: string;
};

export type BuildTransferalTransactionResponse = {
    tx_hex: string;
};

export type BuildTransferalRequestTransactionResponse = {
    tx_hex: string;
};

export type SubmitDepositTransactionResponse = {
    tx_hash: string;
};

export type SubmitWithdrawalTransactionResponse = {
    tx_hash: string;
};

export type SubmitTransferalTransactionResponse = {
    tx_hash: string;
};

export type SubmitTransferalRequestTransactionResponse = {
    tx_hash: string;
};

export type MarketDepth = {
    price: number;
    quantity: number;
};

// export type GetMarketDepthResponse = {
//     bids: MarketDepth[];
//     asks: MarketDepth[];
// };

export type GetMarketPriceResponse = {
    price: number;
};

export type AggregatedOHLC = {
    t: number; // timestamp (epoch seconds)
    s: string; // symbol
    o: number; // open
    h: number; // high
    l: number; // low
    c: number; // close
    v: number; // volume
};

export type GetAggregatedPriceResponse = AggregatedOHLC[];

export type BuildPlaceOrderTransactionResponse = {
    order_id: string;
    tx_hex: string;
};

export type SubmitPlaceOrderTransactionResponse = {
    order: OrderResponse;
};

export type PostOrderResponse = SubmitPlaceOrderTransactionResponse;

export type BuildCancelOrderTransactionResponse = {
    tx_hex: string;
};

export type CancelOrderResponse = {
    order_id: string;
};

export type BuildCancelAllOrdersTransactionResponse = {
    tx_hexes: string[];
};

export type SubmitCancelAllOrdersTransactionResponse = {
    cancelled_order_ids: string[];
};

export type CancelAllOrdersResponse = {
    symbol: string;
    order_ids: string[];
};

export type GetAPIKeyResponse = {
    api_key: string;
    created_at: string;
};

export type GetTransferalRecordsResponse = {
    data: TransferalRecord[];
    total_count: number;
    total_page: number;
};

export type GetTransferalRecordByTxHashResponse = TransferalRecord;

export type SpotAccount = {
    account_id: string;
    account_type: string;
    encrypted_operation_key: string;
    operation_key_hash: string;
    created_at: string;
};

export type GetSpotAccountResponse = SpotAccount;

export type CreateSpotAccountResponse = SpotAccount;

export type UpdateSpotAccountResponse = SpotAccount & {
    updated_at: string;
};

export type GetMaxDepositResponse = {
    max_deposit: string;
};
