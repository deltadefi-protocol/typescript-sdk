import { AppWalletKeyType, MeshWallet } from '@meshsdk/core';

/**
 * Represents a DeFi wallet.
 */
export class DeFiWallet {
    private wallet: MeshWallet;

    /**
     * Creates an instance of DeFiWallet.
     * @param key - The wallet key.
     * @param networkId - The network ID (0 for testnet, 1 for mainnet).
     * @param accountIndex - The account index (default is 0).
     * @param keyIndex - The key index (default is 0).
     */
    constructor(key: AppWalletKeyType, networkId: 0 | 1, accountIndex = 0, keyIndex = 0) {
        this.wallet = new MeshWallet({
            networkId,
            key,
            accountIndex,
            keyIndex,
        });
    }

    static async new(key: AppWalletKeyType, networkId: 0 | 1, accountIndex = 0, keyIndex = 0) {
        const wallet = new MeshWallet({
            networkId,
            key,
            accountIndex,
            keyIndex,
        });

        await wallet.init();
        return wallet;
    }

    public async init() {
        await this.wallet.init();
    }

    /**
     * Signs a transaction.
     * @param txHex - The transaction hex string.
     * @returns A promise that resolves to the signed transaction hex string.
     */
    public async signTx(txHex: string): Promise<string> {
        const signedTx = await this.wallet.signTx(txHex, true);
        return signedTx;
    }

    /**
     * Signs multiple transactions.
     * @param txHexes - An array of transaction hex strings.
     * @returns A promise that resolves to an array of signed transaction hex strings.
     */
    public async signTxs(txHexes: string[]): Promise<string[]> {
        const signedTxs = await this.wallet.signTxs(txHexes, true);
        return signedTxs;
    }
}
