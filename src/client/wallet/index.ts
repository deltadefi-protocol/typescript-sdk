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

    public signTxs(txHexes: string[]): string[] {
        const signedTxs: string[] = [];
        txHexes.forEach((txHex) => {
            const signedTx = this.wallet.signTxSync(txHex, true);
            signedTxs.push(signedTx);
        });
        return signedTxs;
    }
}
