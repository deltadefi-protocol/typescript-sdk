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

    public async signTx(txHex: string): Promise<string> {
        const signedTx = await this.wallet.signTx(txHex, true);
        return signedTx;
    }

    public async signTxs(txHexes: string[]): Promise<string[]> {
        const signedTxs = await this.wallet.signTxs(txHexes, true);
        return signedTxs;
    }
}
