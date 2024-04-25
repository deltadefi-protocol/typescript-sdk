import axios, { AxiosInstance } from 'axios';
import { ApiHeaders, AuthHeaders } from '../types';
import { Accounts } from './accounts';
import { Orders } from './orders';
import { Markets } from './markets';

export class ApiClient {
    private axiosInstance: AxiosInstance;

    public accounts: Accounts;

    public orders: Orders;

    public markets: Markets;

    constructor(baseURL: string, { jwt, apiKey }: AuthHeaders) {
        const headers: ApiHeaders = {
            'Content-Type': 'application/json',
        };
        if (jwt) {
            headers.Authorization = jwt;
        }
        if (apiKey) {
            headers['X-API-KEY'] = apiKey;
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
