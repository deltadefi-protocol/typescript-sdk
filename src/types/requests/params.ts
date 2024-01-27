import { Asset } from '@meshsdk/core';

export type InputUtxos = {
    tx_hash: string;
    tx_id: number;
    amount: Asset[];
    address: string;
};
