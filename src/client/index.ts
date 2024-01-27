import axios, { AxiosInstance } from 'axios';
import { ApiHeaders, AuthHeaders } from '../types';
import { Accounts } from './accounts';

export class ApiClient {
    private axiosInstance: AxiosInstance;

    public accounts: Accounts;

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
    }
}
