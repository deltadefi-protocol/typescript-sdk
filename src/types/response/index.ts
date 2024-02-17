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
    tx_id: string;
    tx_hexes: string[];
};
