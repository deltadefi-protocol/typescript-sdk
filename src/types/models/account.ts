export type AccountBalance = {
    asset: string;
    asset_unit: string;
    free: bigint;
    locked: bigint;
};

export type AccountStream = {
    type: 'Account';
    sub_type: string;
};

export type AccountBalanceStream = {
    type: 'Account';
    sub_type: 'balance';
    balance: AccountBalance[];
};
