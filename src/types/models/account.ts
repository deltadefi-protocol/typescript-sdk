import { TransferStatus } from '../requests';

export type AccountBalance = {
    asset: string;
    asset_unit: string;
    free: bigint;
    locked: bigint;
};

export type TransferalAsset = {
    asset: string;
    asset_unit: string;
    qty: bigint;
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

export type TransferalType = 'normal' | 'deposit' | `withdrawal`;

export type TransferDirection = 'incoming' | 'outgoing';

export type TransferalRecord = {
    created_at: string;
    status: TransferStatus;
    assets: TransferalAsset[];
    transferal_type: TransferalType;
    tx_hash: string;
    direction: TransferDirection;
};
