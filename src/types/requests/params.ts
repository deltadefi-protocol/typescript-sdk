import { Asset } from '@meshsdk/core';

export type InputUtxos = {
    tx_hash: string;
    tx_id: string;
    amount: Asset[];
    address: string;
};
