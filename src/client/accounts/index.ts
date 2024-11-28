import { AxiosInstance } from 'axios';
import {
    SignInRequest,
    SignInResponse,
    BuildDepositTransactionRequest,
    BuildDepositTransactionResponse,
    SubmitDepositTransactionRequest,
    SubmitDepositTransactionResponse,
    convertUTxOs,
    BuildSendRefScriptsTransactionRequest,
    BuildSendRefScriptsTransactionResponse,
    SubmitSendRefScriptsTransactionRequest,
    SubmitSendRefScriptsTransactionResponse,
    BuildWithdrawalTransactionRequest,
    BuildWithdrawalTransactionResponse,
    SubmitWithdrawalTransactionRequest,
    SubmitWithdrawalTransactionResponse,
    GetOrderRecordResponse,
    GetAccountInfoResponse,
    GetNewApiKeyResponse,
    BuildDeleteAccountTransactionResponse,
    SubmitDeleteAccountTransactionRequest,
    SubmitDeleteAccountTransactionResponse,
    GetDepositRecordsResponse,
    GetWithdrawalRecordsResponse,
    GetAccountBalanceResponse,
} from '../../types';
import { Api } from '../api';

export class Accounts extends Api {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        super();
        this.axiosInstance = axiosInstance;
    }

    public signIn(data: SignInRequest): Promise<SignInResponse> {
        const { auth_key, wallet_address } = data;
        const res = this.axiosInstance.post(
            '/accounts/signin',
            { wallet_address },
            { headers: { auth_key } },
        );
        return this.resolveAxiosData(res);
    }

    public updateBalance(): Promise<GetBalanceResponse> {
        const res = this.axiosInstance.get('/accounts/balance/update');
        return this.resolveAxiosData(res);
    }

    public buildSendRefScriptsTransaction(
        data: BuildSendRefScriptsTransactionRequest,
    ): Promise<BuildSendRefScriptsTransactionResponse> {
        const input_utxos = convertUTxOs(data.input_utxos);
        const res = this.axiosInstance.post('/accounts/ref-scripts/build', {
            input_utxos,
            total_deposit_amount: data.total_deposit_amount,
        });
        return this.resolveAxiosData(res);
    }

    public submitSendRefScriptsTransaction(
        data: SubmitSendRefScriptsTransactionRequest,
    ): Promise<SubmitSendRefScriptsTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/ref-scripts/submit', data);
        return this.resolveAxiosData(res);
    }

    public buildDepositTransaction(
        data: BuildDepositTransactionRequest,
    ): Promise<BuildDepositTransactionResponse> {
        const input_utxos = convertUTxOs(data.input_utxos);
        const res = this.axiosInstance.post('/accounts/deposit/build', {
            deposit_amount: data.deposit_amount,
            input_utxos,
        });
        return this.resolveAxiosData(res);
    }

    public submitDepositTransaction(
        data: SubmitDepositTransactionRequest,
    ): Promise<SubmitDepositTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/deposit/submit', data);
        return this.resolveAxiosData(res);
    }

    public buildWithdrawalTransaction(
        data: BuildWithdrawalTransactionRequest,
    ): Promise<BuildWithdrawalTransactionResponse> {
        const input_utxos = convertUTxOs(data.input_utxos);
        const res = this.axiosInstance.post('/accounts/withdrawal/build', {
            withdrawal_amount: data.withdrawal_amount,
            input_utxos,
        });
        return this.resolveAxiosData(res);
    }

    public submitWithdrawalTransaction(
        data: SubmitWithdrawalTransactionRequest,
    ): Promise<SubmitWithdrawalTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/withdrawal/submit', data);
        return this.resolveAxiosData(res);
    }

    public getAccountInfo(): Promise<GetAccountInfoResponse> {
        const res = this.axiosInstance.get('/accounts/info');
        return this.resolveAxiosData(res);
    }

    public getNewApiKey(): Promise<GetNewApiKeyResponse> {
        const res = this.axiosInstance.get('/accounts/new-api-key');
        return this.resolveAxiosData(res);
    }

    public buildDeleteAccountTransaction(): Promise<BuildDeleteAccountTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/delete/build', {});
        return this.resolveAxiosData(res);
    }

    public submitDeleteAccountTransaction(
        data: SubmitDeleteAccountTransactionRequest,
    ): Promise<SubmitDeleteAccountTransactionResponse> {
        const res = this.axiosInstance.post('/accounts/delete/submit', data);
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
}
