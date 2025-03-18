import { AxiosInstance } from 'axios';
import { toSnake } from 'snake-camel';
import {
    SignInRequest,
    SignInResponse,
    BuildDepositTransactionRequest,
    BuildDepositTransactionResponse,
    SubmitDepositTransactionRequest,
    SubmitDepositTransactionResponse,
    BuildWithdrawalTransactionRequest,
    BuildWithdrawalTransactionResponse,
    SubmitWithdrawalTransactionRequest,
    SubmitWithdrawalTransactionResponse,
    GetOrderRecordResponse,
    GetDepositRecordsResponse,
    GetWithdrawalRecordsResponse,
    GetAccountBalanceResponse,
    GenerateNewAPIKeyResponse,
    AccountBalance,
    GetAPIKeyResponse,
} from '../../types';
import { Api } from '../api';

/**
 * Represents the Accounts class.
 */
export class Accounts extends Api {
    balance: AccountBalance[] = [];

    /**
     * Creates an instance of Accounts.
     * @param axiosInstance - The Axios instance for making HTTP requests.
     * @param wsURL - The WebSocket URL.
     * @param jwt - The JSON Web Token for authentication.
     */
    constructor(private axiosInstance: AxiosInstance, private wsURL: string, private jwt: string) {
        super();
    }

    /**
     * Signs in a user.
     * @param data - The sign-in request data.
     * @returns A promise that resolves to the sign-in response.
     */
    public signIn(data: SignInRequest): Promise<SignInResponse> {
        const { x_api_key, wallet_address } = data;
        const res = this.axiosInstance.post(
            '/accounts/signin',
            { wallet_address },
            { headers: { 'X-API-KEY': x_api_key } },
        );
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves deposit records.
     * @returns A promise that resolves to the deposit records response.
     */
    public getDepositRecords(): Promise<GetDepositRecordsResponse> {
        const res = this.axiosInstance.get('/accounts/deposit-records');
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves withdrawal records.
     * @returns A promise that resolves to the withdrawal records response.
     */
    public getWithdrawalRecords(): Promise<GetWithdrawalRecordsResponse> {
        const res = this.axiosInstance.get('/accounts/withdrawal-records');
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves order records.
     * @returns A promise that resolves to the order records response.
     */
    public getOrderRecords(): Promise<GetOrderRecordResponse> {
        const res = this.axiosInstance.get('/accounts/order-records');
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves account balance.
     * @returns A promise that resolves to the account balance response.
     */
    public getAccountBalance(): Promise<GetAccountBalanceResponse> {
        const res = this.axiosInstance.get('/accounts/balance');
        return this.resolveAxiosData(res);
    }

    /**
     * Creates a new API key.
     * @returns A promise that resolves to the new API key response.
     */
    public createNewApiKey(): Promise<GenerateNewAPIKeyResponse> {
        const res = this.axiosInstance.get('/accounts/new-api-key');
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves the current API key.
     * @returns A promise that resolves to the API key response.
     */
    public getApiKey(): Promise<GetAPIKeyResponse> {
        const res = this.axiosInstance.get('/accounts/api-key');
        return this.resolveAxiosData(res);
    }

    /**
     * Builds a deposit transaction.
     * @param data - The build deposit transaction request data.
     * @returns A promise that resolves to the build deposit transaction response.
     */
    public buildDepositTransaction(
        data: BuildDepositTransactionRequest,
    ): Promise<BuildDepositTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/deposit/build', {
            deposit_amount: data.deposit_amount,
            input_utxos: data.input_utxos.map(toSnake),
        });
        return this.resolveAxiosData(res);
    }

    /**
     * Builds a withdrawal transaction.
     * @param data - The build withdrawal transaction request data.
     * @returns A promise that resolves to the build withdrawal transaction response.
     */
    public buildWithdrawalTransaction(
        data: BuildWithdrawalTransactionRequest,
    ): Promise<BuildWithdrawalTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/withdrawal/build', {
            withdrawal_amount: data.withdrawal_amount,
        });
        return this.resolveAxiosData(res);
    }

    /**
     * Submits a deposit transaction.
     * @param data - The submit deposit transaction request data.
     * @returns A promise that resolves to the submit deposit transaction response.
     */
    public submitDepositTransaction(
        data: SubmitDepositTransactionRequest,
    ): Promise<SubmitDepositTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/deposit/submit', data);
        return this.resolveAxiosData(res);
    }

    /**
     * Submits a withdrawal transaction.
     * @param data - The submit withdrawal transaction request data.
     * @returns A promise that resolves to the submit withdrawal transaction response.
     */
    public submitWithdrawalTransaction(
        data: SubmitWithdrawalTransactionRequest,
    ): Promise<SubmitWithdrawalTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/withdrawal/submit', data);
        return this.resolveAxiosData(res);
    }
}
