import { AppWalletKeyType, MeshWallet } from '@meshsdk/core';

export class DeFiWallet {
    private wallet: MeshWallet;

    constructor(key: AppWalletKeyType, networkId: 0 | 1) {
        this.wallet = new MeshWallet({
            networkId,
            key,
        });
    }

    public async signTx(txHex: string): Promise<string> {
        const signedTx = this.wallet.signTx(txHex, true);
        return signedTx;
    }

    public async signTxs(txHexes: string[]): Promise<string[]> {
        const signedTxs = this.wallet.signTxs(txHexes, true);
        return signedTxs;
    }
}
