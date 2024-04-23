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
    tx_hex: string;
};

export type SubmitWithdrawalTransactionResponse = {
    tx_hash: string;
};

export type BuildPostOrderTransactionResponse = {
    order_id: string;
    tx_hexes: string[];
};

export type SubmitPostOrderTransactionResponse = {
    order: string;
    tx_hexes: string[];
};

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
