/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import { AppWalletKeyType } from '@meshsdk/core';
import { DeFiWallet } from '../src/client/wallet';

dotenv.config();

const signingKey: AppWalletKeyType = {
    type: 'mnemonic',
    words: new Array(24).fill('solution') as string[],
};

describe('', () => {
    test('Signing Tx from DeFi Wallet', async () => {
        const wallet = new DeFiWallet(signingKey, 0);

        // const unsignedTx =
        //     '84a50083825820126f81a9b5bff0662518d26571c357077bbef9952a890f087ad54ee89acb0ad100825820410c9709e82da1628694df2bfba2add56100fb401b59a24be72494d5963d20c600825820f49358fc8d8b166d28641c71fd50f81730d43645a85b9924900364bdc5028d5c000182825839005867c3b8e27840f556ac268b781578b14c5661fc63ee720dbeab663f9d4dcd7e454d2434164f4efb8edeb358d86a1dad9ec6224cfcbce3e61a000f4240825839005867c3b8e27840f556ac268b781578b14c5661fc63ee720dbeab663f9d4dcd7e454d2434164f4efb8edeb358d86a1dad9ec6224cfcbce3e61a0049adbb021a00029d85048009a0a0f5f6';

        // const signedTx = await wallet.signTx(unsignedTx);

        // console.log('signed tx', signedTx);

        // expect(signedTx).toBe(
        //     '84a50083825820126f81a9b5bff0662518d26571c357077bbef9952a890f087ad54ee89acb0ad100825820410c9709e82da1628694df2bfba2add56100fb401b59a24be72494d5963d20c600825820f49358fc8d8b166d28641c71fd50f81730d43645a85b9924900364bdc5028d5c000182825839005867c3b8e27840f556ac268b781578b14c5661fc63ee720dbeab663f9d4dcd7e454d2434164f4efb8edeb358d86a1dad9ec6224cfcbce3e61a000f4240825839005867c3b8e27840f556ac268b781578b14c5661fc63ee720dbeab663f9d4dcd7e454d2434164f4efb8edeb358d86a1dad9ec6224cfcbce3e61a0049adbb021a00029d85048009a0a10081825820c32dfdb461dd016e8fdd9b6d424a77439eab8f8c644a804b013b6cefa2454f9558404a88403c950dc7ada9cfd27850b7fe23365b3c4bcb5bd1abbecc19f446c48209779c6b25ec909cfa218a4f1e70ce7df53213bfd3b98f361a706fb30c38a02b0cf5f6',
        // );
    });
});
