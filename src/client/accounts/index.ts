import { AxiosInstance } from 'axios';
import {
    CreateAccountRequest,
    CreateAccountResponse,
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
    GetBalanceResponse,
} from '../../types';
import { Api } from '../api';

export class Accounts extends Api {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        super();
        this.axiosInstance = axiosInstance;
    }

    public create(data: CreateAccountRequest): Promise<CreateAccountResponse> {
        return this.axiosInstance.post('/accounts/create', data);
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

    public getBalance(): Promise<GetBalanceResponse> {
        const res = this.axiosInstance.get('/accounts/balance');
        return this.resolveAxiosData(res);
    }

    public buildSendRefScriptsTransaction(
        data: BuildSendRefScriptsTransactionRequest,
    ): Promise<BuildSendRefScriptsTransactionResponse> {
        const input_utxos = convertUTxOs(data.input_utxos);
        const res = this.axiosInstance.post('/accounts/ref-scripts/build', {
            input_utxos,
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
}
