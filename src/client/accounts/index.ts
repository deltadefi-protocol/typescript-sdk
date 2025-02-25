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
    // AccountStream,
    // AccountBalanceStream,
} from '../../types';
import { Api } from '../api';

export class Accounts extends Api {
    balance: AccountBalance[] = [];

    constructor(private axiosInstance: AxiosInstance, private wsURL: string, private jwt: string) {
        super();
    }

    // SignIn to be refactored
    public signIn(data: SignInRequest): Promise<SignInResponse> {
        const { x_api_key, wallet_address } = data;
        const res = this.axiosInstance.post(
            '/accounts/signin',
            { wallet_address },
            { headers: { 'X-API-KEY': x_api_key } },
        );
        return this.resolveAxiosData(res);
    }

    public getDepositRecords(): Promise<GetDepositRecordsResponse> {
        const res = this.axiosInstance.get('/accounts/deposit-records');
        return this.resolveAxiosData(res);
    }

    public getWithdrawalRecords(): Promise<GetWithdrawalRecordsResponse> {
        const res = this.axiosInstance.get('/accounts/withdrawal-records');
        return this.resolveAxiosData(res);
    }

    public getOrderRecords(): Promise<GetOrderRecordResponse> {
        const res = this.axiosInstance.get('/accounts/order-records');
        return this.resolveAxiosData(res);
    }

    public getAccountBalance(): Promise<GetAccountBalanceResponse> {
        const res = this.axiosInstance.get('/accounts/balance');
        return this.resolveAxiosData(res);
    }

    public createNewApiKey(): Promise<GenerateNewAPIKeyResponse> {
        const res = this.axiosInstance.get('/accounts/new-api-key');
        return this.resolveAxiosData(res);
    }

    public buildDepositTransaction(
        data: BuildDepositTransactionRequest,
    ): Promise<BuildDepositTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/deposit/build', {
            deposit_amount: data.deposit_amount,
            input_utxos: data.input_utxos.map(toSnake),
        });
        return this.resolveAxiosData(res);
    }

    public buildWithdrawalTransaction(
        data: BuildWithdrawalTransactionRequest,
    ): Promise<BuildWithdrawalTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/withdrawal/build', {
            withdrawal_amount: data.withdrawal_amount,
        });
        return this.resolveAxiosData(res);
    }

    public submitDepositTransaction(
        data: SubmitDepositTransactionRequest,
    ): Promise<SubmitDepositTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/deposit/submit', data);
        return this.resolveAxiosData(res);
    }

    public submitWithdrawalTransaction(
        data: SubmitWithdrawalTransactionRequest,
    ): Promise<SubmitWithdrawalTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/withdrawal/submit', data);
        return this.resolveAxiosData(res);
    }

    // public async subscribe(): Promise<void> {
    //     if (!this.jwt) {
    //         throw new Error('Cannot subscribe account without signin');
    //     }
    //     const ws = new DeltaDeFiWS(`${this.wsURL}?token=${this.jwt}`);

    //     const wsAccountBalance = JSON.parse(ws.data || '') as AccountStream;
    //     if (wsAccountBalance.type !== 'Account' || wsAccountBalance.sub_type !== 'balance') {
    //         return;
    //     }
    //     this.balance = (wsAccountBalance as AccountBalanceStream).balance;
    // }
}
