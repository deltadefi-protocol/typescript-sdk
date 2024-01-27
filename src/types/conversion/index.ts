import { TxInParameter } from '@meshsdk/core';
import { InputUtxos } from '../requests/params';

export const convertTxInParameter = (txIn: TxInParameter): InputUtxos => ({
    tx_hash: txIn.txHash,
    tx_id: txIn.txIndex,
    amount: txIn.amount || [],
    address: txIn.address || '',
});
