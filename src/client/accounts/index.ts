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
    GetDepositRecordsResponse,
    GetWithdrawalRecordsResponse,
    GetAccountBalanceResponse,
    GenerateNewAPIKeyResponse,
    AccountBalance,
    GetAPIKeyResponse,
    GetOperationKeyResponse,
    BuildTransferalTransactionRequest,
    BuildTransferalTransactionResponse,
    SubmitTransferalTransactionRequest,
    SubmitTransferalTransactionResponse,
    BuildTransferalRequestTransactionRequest,
    BuildTransferalRequestTransactionResponse,
    SubmitTransferalRequestTransactionRequest,
    SubmitTransferalRequestTransactionResponse,
    GetTransferalRecordsResponse,
    GetTransferalRecordsRequest,
    GetTransferalRecordByTxHashRequest,
    GetTransferalRecordByTxHashResponse,
    GetOpenOrdersRequest,
    GetOpenOrdersResponse,
    GetTradeOrdersRequest,
    GetTradeOrdersResponse,
    GetTradesRequest,
    GetTradesResponse,
    GetOrderByIdRequest,
    GetOrderByIdResponse,
    GetSpotAccountResponse,
    CreateSpotAccountRequest,
    CreateSpotAccountResponse,
    UpdateSpotAccountRequest,
    UpdateSpotAccountResponse,
    GetMaxDepositResponse,
    GetDepositRecordsRequest,
    GetWithdrawalRecordsRequest,
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
     * @deprecated This method is for frontend web app only. SDK users should use X-API-KEY authentication instead.
     * Signs in a user.
     * @param data - The sign-in request data.
     * @returns A promise that resolves to the sign-in response.
     */
    public signIn(data: SignInRequest): Promise<SignInResponse> {
        const {
            x_api_key,
            wallet_address,
            encrypted_operation_key,
            operation_key_hash,
            is_script_operation_key,
        } = data;
        const res = this.axiosInstance.post(
            '/accounts/signin',
            {
                wallet_address,
                encrypted_operation_key,
                operation_key_hash,
                is_script_operation_key,
            },
            { headers: { 'X-API-KEY': x_api_key } },
        );
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves encryption operation key
     * @returns A promise that resolves to the operation key response.
     */
    public getOperationKey(): Promise<GetOperationKeyResponse> {
        const res = this.axiosInstance.get('/accounts/operation-key');
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves deposit records.
     * @param data - Optional pagination parameters.
     * @returns A promise that resolves to the deposit records response.
     */
    public getDepositRecords(data?: GetDepositRecordsRequest): Promise<GetDepositRecordsResponse> {
        const res = this.axiosInstance.get('/accounts/deposit-records', { params: data });
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves withdrawal records.
     * @param data - Optional pagination parameters.
     * @returns A promise that resolves to the withdrawal records response.
     */
    public getWithdrawalRecords(
        data?: GetWithdrawalRecordsRequest,
    ): Promise<GetWithdrawalRecordsResponse> {
        const res = this.axiosInstance.get('/accounts/withdrawal-records', { params: data });
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves open orders for a symbol.
     * @param data - The open orders request parameters.
     * @returns A promise that resolves to the open orders response.
     */
    public getOpenOrders(data: GetOpenOrdersRequest): Promise<GetOpenOrdersResponse> {
        const res = this.axiosInstance.get('/accounts/open-orders', { params: data });
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves trade orders (orders with executions) for a symbol.
     * @param data - The trade orders request parameters.
     * @returns A promise that resolves to the trade orders response.
     */
    public getTradeOrders(data: GetTradeOrdersRequest): Promise<GetTradeOrdersResponse> {
        const res = this.axiosInstance.get('/accounts/trade-orders', { params: data });
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves execution records (trades) for a symbol.
     * @param data - The trades request parameters.
     * @returns A promise that resolves to the trades response.
     */
    public getTrades(data: GetTradesRequest): Promise<GetTradesResponse> {
        const res = this.axiosInstance.get('/accounts/trades', { params: data });
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves a single order by ID.
     * @param data - The order ID request.
     * @returns A promise that resolves to the order response.
     */
    public getOrderById(data: GetOrderByIdRequest): Promise<GetOrderByIdResponse> {
        const res = this.axiosInstance.get(`/accounts/order/${data.id}`);
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves transferal records.
     * @param data - The transferal records request parameters.
     * @returns A promise that resolves to the transferal records response.
     */
    public getTransferalRecords(
        data: GetTransferalRecordsRequest,
    ): Promise<GetTransferalRecordsResponse> {
        const res = this.axiosInstance.get(`/accounts/transferal-records`, { params: data });
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves a single transferal record by transaction hash.
     * @param txHash - The transaction hash of the transferal record to retrieve.
     * @returns A promise that resolves to the transferal record response.
     */
    public getTransferalRecordByTxHash(
        data: GetTransferalRecordByTxHashRequest,
    ): Promise<GetTransferalRecordByTxHashResponse> {
        const res = this.axiosInstance.get(`/accounts/transferal-records/${data.tx_hash}`);
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
     * Builds a transferal transaction.
     * @param data - The build transferal transaction request data.
     * @returns A promise that resolves to the build transferal transaction response.
     */
    public buildTransferalTransaction(
        data: BuildTransferalTransactionRequest,
    ): Promise<BuildTransferalTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/transferal/build', data);
        return this.resolveAxiosData(res);
    }

    /**
     * Builds a transferal request transaction.
     * @param data - The build transferal transaction request data.
     * @returns A promise that resolves to the build transferal transaction response.
     */
    public buildTransferalRequestTransaction(
        data: BuildTransferalRequestTransactionRequest,
    ): Promise<BuildTransferalRequestTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/request-transferal/build', data);
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

    /**
     * Submits a transferal transaction.
     * @param data - The submit transferal transaction request data.
     * @returns A promise that resolves to the submit transferal transaction response.
     */
    public submitTransferalTransaction(
        data: SubmitTransferalTransactionRequest,
    ): Promise<SubmitTransferalTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/transferal/submit', data);
        return this.resolveAxiosData(res);
    }

    /**
     * Submits a transferal requesttransaction.
     * @param data - The submit transferal transaction request data.
     * @returns A promise that resolves to the submit transferal transaction response.
     */
    public submitTransferalRequestTransaction(
        data: SubmitTransferalRequestTransactionRequest,
    ): Promise<SubmitTransferalRequestTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/request-transferal/submit', data);
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves the spot account details.
     * @returns A promise that resolves to the spot account response.
     */
    public getSpotAccount(): Promise<GetSpotAccountResponse> {
        const res = this.axiosInstance.get('/accounts/spot-account');
        return this.resolveAxiosData(res);
    }

    /**
     * Creates a spot account.
     * @param data - The create spot account request data.
     * @returns A promise that resolves to the create spot account response.
     */
    public createSpotAccount(data: CreateSpotAccountRequest): Promise<CreateSpotAccountResponse> {
        const res = this.axiosInstance.post('/accounts/spot-account', data);
        return this.resolveAxiosData(res);
    }

    /**
     * Updates the spot account.
     * @param data - The update spot account request data.
     * @returns A promise that resolves to the update spot account response.
     */
    public updateSpotAccount(data: UpdateSpotAccountRequest): Promise<UpdateSpotAccountResponse> {
        const res = this.axiosInstance.put('/accounts/spot-account', data);
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves the maximum deposit amount.
     * @returns A promise that resolves to the max deposit response.
     */
    public getMaxDeposit(): Promise<GetMaxDepositResponse> {
        const res = this.axiosInstance.get('/accounts/max-deposit');
        return this.resolveAxiosData(res);
    }
}
