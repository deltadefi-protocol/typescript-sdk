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
} from '../../types';

export class Accounts {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    public create(data: CreateAccountRequest): Promise<CreateAccountResponse> {
        return this.axiosInstance.post('/accounts/create', data);
    }

    public signIn(data: SignInRequest): Promise<SignInResponse> {
        return this.axiosInstance.post('/accounts/signin', data);
    }

    public buildDepositTransaction(
        data: BuildDepositTransactionRequest,
    ): Promise<BuildDepositTransactionResponse> {
        return this.axiosInstance.post('/accounts/deposit/build', data);
    }

    public submitDepositTransaction(
        data: SubmitDepositTransactionRequest,
    ): Promise<SubmitDepositTransactionResponse> {
        return this.axiosInstance.post('/accounts/deposit/submit', data);
    }
}
