import { AppWalletKeyType, AppWallet } from '@meshsdk/core';

export class DeFiWallet {
    private wallet: AppWallet;

    constructor(key: AppWalletKeyType, networkId: 0 | 1) {
        this.wallet = new AppWallet({
            networkId,
            key,
        });
    }

    public signTx(txHex: string): string {
        const signedTx = this.wallet.signTxSync(txHex, true);
        return signedTx;
    }

    public async signTxs(txHexes: string[]): Promise<string[]> {
        const signedTxs = this.wallet.signTxs(txHexes, true);
        return signedTxs;
    }
}
