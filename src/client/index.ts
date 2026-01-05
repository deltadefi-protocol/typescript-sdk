import { MeshWallet } from '@meshsdk/core';
import axios, { AxiosInstance } from 'axios';
import {
    ApiConfig,
    ApiHeaders,
    PostOrderRequest,
    PostOrderResponse,
    CancelOrderResponse,
    CancelAllOrdersResponse,
    TradingSymbol,
} from '../types';
import { Accounts } from './accounts';
import { Orders } from './orders';
import { Markets } from './markets';
import { decryptWithCipher } from './components/encryption';

/**
 * Represents the API client for interacting with the DeltaDefi API.
 */
export class ApiClient {
    private axiosInstance: AxiosInstance;

    private wsURL: string;

    private jwt: string = '';

    public networkId: 0 | 1 = 1;

    public accounts: Accounts;

    public orders: Orders;

    public markets: Markets;

    public masterWallet?: MeshWallet;

    public operationWallet?: MeshWallet;

    /**
     * Creates an instance of ApiClient.
     * @param config - The API configuration.
     * @param providedBaseURL - Optional base URL for the API.
     * @param providedWsURL - Optional WebSocket URL for the API.
     */
    constructor(
        { network, jwt, apiKey, masterWallet }: ApiConfig,
        providedBaseURL?: string,
        providedWsURL?: string,
    ) {
        let baseURL = 'https://api.deltadefi.io';
        let wsURL = 'wss://stream.deltadefi.io';
        const headers: ApiHeaders = {
            'Content-Type': 'application/json',
        };
        if (network) {
            this.networkId = network === 'mainnet' ? 1 : 0;
            if (network === 'mainnet') {
                baseURL = 'https://api.deltadefi.io';
                wsURL = 'wss://stream.deltadefi.io';
            } else {
                baseURL = 'https://api-staging.deltadefi.io';
                wsURL = 'wss://stream-staging.deltadefi.io';
            }
        }
        if (jwt) {
            headers.Authorization = jwt;
            this.jwt = jwt;
        }
        if (apiKey) {
            headers['X-API-KEY'] = apiKey;
        }
        if (masterWallet) {
            this.masterWallet = masterWallet;
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
     * Initializes the operation wallet with the provided encryption password.
     * @param password - The password used to decrypt the operation key.
     */
    public async loadOperationKey(password: string) {
        const { encrypted_operation_key: encryptedOperationKey } =
            await this.accounts.getOperationKey();
        const operationKey = await decryptWithCipher({
            encryptedDataJSON: encryptedOperationKey,
            key: password,
        });
        this.operationWallet = new MeshWallet({
            key: {
                type: 'root',
                bech32: operationKey,
            },
            networkId: this.networkId,
        });
    }

    /**
     * Posts an order.
     * @param data - The post order request data.
     * @returns A promise that resolves to the post order response.
     * @throws An error if the wallet is not initialized.
     */
    public async postOrder(data: PostOrderRequest): Promise<PostOrderResponse> {
        if (!this.operationWallet) {
            throw new Error('Operation wallet is not initialized');
        }
        const buildRes = await this.orders.buildPlaceOrderTransaction(data);
        const signedTx = await this.operationWallet.signTx(buildRes.tx_hex);
        const submitRes: PostOrderResponse = await this.orders.submitPlaceOrderTransaction({
            order_id: buildRes.order_id,
            signed_tx: signedTx,
        });
        return submitRes;
    }

    /**
     * Cancels an order.
     * @param orderId - The ID of the order to cancel.
     * @returns A promise that resolves to the cancel order response.
     */
    public async cancelOrder(orderId: string): Promise<CancelOrderResponse> {
        return this.orders.cancelOrder(orderId);
    }

    /**
     * Cancels all open orders for a symbol.
     * @param symbol - The trading symbol to cancel orders for.
     * @returns A promise that resolves to the cancel all orders response.
     */
    public async cancelAllOrders(symbol: TradingSymbol): Promise<CancelAllOrdersResponse> {
        return this.orders.cancelAllOrders({ symbol });
    }
}

export { encryptWithCipher, decryptWithCipher } from './components/encryption';
