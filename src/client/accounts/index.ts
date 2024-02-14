import { AxiosInstance } from 'axios';
import {
    convertTxInParameter,
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
        const { auth_key, wallet_address } = data;
        return this.axiosInstance.post(
            '/accounts/signin',
            { wallet_address },
            { headers: { auth_key } },
        );
    }

    public buildDepositTransaction(
        data: BuildDepositTransactionRequest,
    ): Promise<BuildDepositTransactionResponse> {
        const input_utxos = data.input_utxos.map(convertTxInParameter);
        return this.axiosInstance.post('/accounts/deposit/build', {
            deposit_amount: data.deposit_amount,
            input_utxos,
        });
    }

    public submitDepositTransaction(
        data: SubmitDepositTransactionRequest,
    ): Promise<SubmitDepositTransactionResponse> {
        return this.axiosInstance.post('/accounts/deposit/submit', data);
    }
}
