export type SignInResponse = {
    token: string;
};

export type CreateAccountResponse = {
    message: string;
};

export type BuildDepositTransactionResponse = {
    tx_hex: string;
};

export type SubmitDepositTransactionResponse = {
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
