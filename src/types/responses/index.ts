import { Order } from '../models';

export type SignInResponse = {
    token: string;
    is_ready: boolean;
};

export type GetBalanceResponse = {
    balance: {
        total: Record<string, number>;
        available_for_trade: Record<string, number>;
        available_for_withdrawal: Record<string, number>;
        held_for_order: Record<string, number>;
        spending_settling: Record<string, number>;
        depositing_settling: Record<string, number>;
    };
};

export type GetOrdersResponse = {
    orders: Order[];
};

export type BuildSendRefScriptsTransactionResponse = {
    tx_hex: string;
};

export type SubmitSendRefScriptsTransactionResponse = {
    tx_hash: string;
};

export type BuildDepositTransactionResponse = {
    tx_hex: string;
};

export type SubmitDepositTransactionResponse = {
    tx_hash: string;
};

export type BuildWithdrawalTransactionResponse = {
    tx_hexes: string[];
};

export type SubmitWithdrawalTransactionResponse = {
    tx_hash: string;
};

export type BuildPostOrderTransactionResponse = {
    order_id: string;
    chained_txs: string[];
    tx_hexes: string[];
};

export type SubmitPostOrderTransactionResponse = {
    order: Order;
    tx_hexes: string[];
};

export type PostOrderResponse = SubmitPostOrderTransactionResponse;

export type CancelOrderResponse = {
    message: string;
};

export type MarketDepth = {
    price: number;
    quantity: number;
};

export type GetDepthResponse = {
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

export type GetAccountInfoResponse = {
    api_key: string;
    api_limit: string;
    created_at: string;
    updated_at: string;
    wallet_address: string;
    is_ready: boolean;
};

export type GetNewApiKeyResponse = {
    api_key: string;
};
