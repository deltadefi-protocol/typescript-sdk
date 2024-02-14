import { TxInParameter, UTxO } from '@meshsdk/core';
import { InputUtxos } from '../requests/params';

export const convertUTxO = (utxo: UTxO): InputUtxos => ({
    tx_hash: utxo.input.txHash,
    tx_id: utxo.input.outputIndex.toString(),
    amount: utxo.output.amount,
    address: utxo.output.address,
});

export const convertUTxOs = (utxos: UTxO[]): InputUtxos[] => utxos.map(convertUTxO);

export const convertTxInParameter = (txIn: TxInParameter): InputUtxos => ({
    tx_hash: txIn.txHash,
    tx_id: txIn.txIndex.toString(),
    amount: txIn.amount || [],
    address: txIn.address || '',
});
