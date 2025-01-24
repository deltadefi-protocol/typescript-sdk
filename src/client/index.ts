import axios, { AxiosInstance } from 'axios';
import { ApiConfig, ApiHeaders, PostOrderRequest, PostOrderResponse } from '../types';
import { Accounts } from './accounts';
import { Orders } from './orders';
import { Markets } from './markets';
import { DeFiWallet } from './wallet';

export class ApiClient {
    private axiosInstance: AxiosInstance;

    public networkId: 0 | 1 = 0;

    public accounts: Accounts;

    public orders: Orders;

    public markets: Markets;

    public wallet?: DeFiWallet;

    constructor({ network, jwt, apiKey, signingKey }: ApiConfig, ProvidedBaseURL?: string) {
        let baseURL = 'https://api-dev.deltadefi.io';
        const headers: ApiHeaders = {
            'Content-Type': 'application/json',
        };
        if (network) {
            this.networkId = network === 'mainnet' ? 1 : 0;
            baseURL =
                network === 'mainnet'
                    ? 'https://api-dev.deltadefi.io'
                    : 'https://api-dev.deltadefi.io'; // TODO: input production link once available
        }
        if (jwt) {
            headers.Authorization = jwt;
        }
        if (apiKey) {
            headers['X-API-KEY'] = apiKey;
        }
        if (signingKey) {
            this.wallet = new DeFiWallet(signingKey, this.networkId);
        }
        if (ProvidedBaseURL) {
            baseURL = ProvidedBaseURL;
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
        const buildRes = await this.orders.buildPlaceOrderTransaction(data);
        const signedTx = this.wallet.signTx(buildRes.tx_hex);
        const submitRes: PostOrderResponse = await this.orders.submitPlaceOrderTransaction({
            order_id: buildRes.order_id,
            signed_tx: signedTx,
        });
        return submitRes;
    }
}
