import { OrderJSON, AccountBalance, OrderFillingRecordJSON } from '../models';

export type SignInResponse = {
    token: string;
    encrypted_operation_key: string;
    operation_key_hash: string;
    is_first_time: boolean;
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
    qty: number;
};

export type DepositRecord = {
    created_at: string;
    status: TransactionStatus;
    assets: AssetRecord[];
    tx_hash: string;
};

export type GetDepositRecordsResponse = DepositRecord[];

export type GetOrderRecordResponse = {
    orders: OrderJSON[];
    order_filling_records: OrderFillingRecordJSON[];
};

export type WithdrawalRecord = {
    created_at: string;
    status: TransactionStatus;
    assets: AssetRecord[];
};

export type GetWithdrawalRecordsResponse = WithdrawalRecord[];

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

export type SubmitDepositTransactionResponse = {
    tx_hash: string;
};

export type SubmitWithdrawalTransactionResponse = {
    tx_hash: string;
};

export type SubmitTransferalTransactionResponse = {
    tx_hash: string;
};

export type GetTermsAndConditionResponse = string;

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

export type SubmitPlaceOrderTransactionResponse = {
    order: OrderJSON;
};

export type PostOrderResponse = SubmitPlaceOrderTransactionResponse;

export type BuildCancelOrderTransactionResponse = {
    tx_hex: string;
};

export type GetAPIKeyResponse = {
    api_key: string;
    created_at: string;
};

export type GetHydraCycleResponse = {
    start: string;
    end: string;
};
