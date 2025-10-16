import { Asset } from '../requests';

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

export type TransferStatus = 'pending' | 'confirmed';

export type TransferalType = 'normal' | 'deposit' | `withdrawal`;

export type TransferDirection = 'incoming' | 'outgoing';

export type TransferalRecord = {
    created_at: string;
    status: TransferStatus;
    assets: Asset[];
    tx_hash: string;
    direction: TransferDirection;
};
