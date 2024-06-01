import axios, { AxiosInstance } from 'axios';
import { ApiConfig, ApiHeaders } from '../types';
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
}
