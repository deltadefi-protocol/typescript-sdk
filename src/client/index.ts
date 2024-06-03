import axios, { AxiosInstance } from 'axios';
import { ApiConfig, ApiHeaders, PostOrderRequest, PostOrderResponse } from '../types';
import { Accounts } from './accounts';
import { Orders } from './orders';
import { Markets } from './markets';
import { DeFiWallet } from './wallet';

export class ApiClient {
    private axiosInstance: AxiosInstance;

    public networkId = 0;

    public accounts: Accounts;

    public orders: Orders;

    public markets: Markets;

    public wallet?: DeFiWallet;

    constructor(baseURL: string, { networkId, jwt, apiKey, signingKey }: ApiConfig) {
        const headers: ApiHeaders = {
            'Content-Type': 'application/json',
        };
        if (networkId) {
            this.networkId = networkId;
        }
        if (jwt) {
            headers.Authorization = jwt;
        }
        if (apiKey) {
            headers['X-API-KEY'] = apiKey;
        }
        if (signingKey) {
            this.wallet = new DeFiWallet(signingKey, networkId || 0);
        }
        this.axiosInstance = axios.create({
            baseURL,
            headers,
        });

        this.accounts = new Accounts(this.axiosInstance);
        this.orders = new Orders(this.axiosInstance);
        this.markets = new Markets(this.axiosInstance);
    }

    public async postOrder(data: PostOrderRequest): Promise<PostOrderResponse> {
        if (!this.wallet) {
            throw new Error('Wallet is not initialized');
        }
        const buildRes = await this.orders.buildPostOrderTransaction(data);
        const signedTxs = this.wallet.signTxs(buildRes.tx_hexes);
        const submitRes: PostOrderResponse = await this.orders.submitPostOrderTransactionRequest({
            order_id: buildRes.order_id,
            signed_txs: signedTxs,
        });
        return submitRes;
    }
}
