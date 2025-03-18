import axios, { AxiosInstance } from 'axios';
import { ApiConfig, ApiHeaders, PostOrderRequest, PostOrderResponse } from '../types';
import { Accounts } from './accounts';
import { Orders } from './orders';
import { Markets } from './markets';
import { DeFiWallet } from './wallet';

/**
 * Represents the API client for interacting with the DeltaDefi API.
 */
export class ApiClient {
    private axiosInstance: AxiosInstance;
    private wsURL: string;
    private jwt: string = '';
    public networkId: 0 | 1 = 0;
    public accounts: Accounts;
    public orders: Orders;
    public markets: Markets;
    public wallet?: DeFiWallet;

    /**
     * Creates an instance of ApiClient.
     * @param config - The API configuration.
     * @param providedBaseURL - Optional base URL for the API.
     * @param providedWsURL - Optional WebSocket URL for the API.
     */
    constructor(
        { network, jwt, apiKey, signingKey }: ApiConfig,
        providedBaseURL?: string,
        providedWsURL?: string,
    ) {
        let baseURL = 'https://api-dev.deltadefi.io';
        let wsURL = 'wss://api-dev.deltadefi.io';
        const headers: ApiHeaders = {
            'Content-Type': 'application/json',
        };
        if (network) {
            this.networkId = network === 'mainnet' ? 1 : 0;
            if (network === 'mainnet') {
                // TODO: input production link once available
                baseURL = 'https://api.deltadefi.io';
                wsURL = 'wss://api-dev.deltadefi.io';
            } else {
                baseURL = 'https://api.deltadefi.io';
                wsURL = 'wss://api-dev.deltadefi.io';
            }
        }
        if (jwt) {
            headers.Authorization = jwt;
            this.jwt = jwt;
        }
        if (apiKey) {
            headers['X-API-KEY'] = apiKey;
        }
        if (signingKey) {
            this.wallet = new DeFiWallet(signingKey, this.networkId);
        }
        if (providedBaseURL) {
            baseURL = providedBaseURL;
        }
        if (providedWsURL) {
            wsURL = providedWsURL;
        }
        this.axiosInstance = axios.create({
            baseURL,
            headers,
        });
        this.wsURL = wsURL;

        this.accounts = new Accounts(this.axiosInstance, this.wsURL, this.jwt);
        this.orders = new Orders(this.axiosInstance);
        this.markets = new Markets(this.axiosInstance);
    }

    /**
     * Posts an order.
     * @param data - The post order request data.
     * @returns A promise that resolves to the post order response.
     * @throws An error if the wallet is not initialized.
     */
    public async postOrder(data: PostOrderRequest): Promise<PostOrderResponse> {
        if (!this.wallet) {
            throw new Error('Wallet is not initialized');
        }
        const buildRes = await this.orders.buildPlaceOrderTransaction(data);
        const signedTx = await this.wallet.signTx(buildRes.tx_hex);
        const submitRes: PostOrderResponse = await this.orders.submitPlaceOrderTransaction({
            order_id: buildRes.order_id,
            signed_tx: signedTx,
        });
        return submitRes;
    }
}
