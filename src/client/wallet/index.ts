import { AppWalletKeyType, MeshWallet } from '@meshsdk/core';

export class DeFiWallet {
    private wallet: MeshWallet;

    constructor(key: AppWalletKeyType, networkId: 0 | 1, accountIndex = 0, keyIndex = 0) {
        this.wallet = new MeshWallet({
            networkId,
            key,
            accountIndex,
            keyIndex,
        });
    }

    public signTx(txHex: string): string {
        const signedTx = this.wallet.signTx(txHex, true);
        return signedTx;
    }

    public signTxs(txHexes: string[]): string[] {
        const signedTxs = this.wallet.signTxs(txHexes, true);
        return signedTxs;
    }
}
