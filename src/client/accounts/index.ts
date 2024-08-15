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
    GetBalanceResponse,
    BuildWithdrawalTransactionRequest,
    BuildWithdrawalTransactionResponse,
    SubmitWithdrawalTransactionRequest,
    SubmitWithdrawalTransactionResponse,
    GetOrdersResponse,
    GetAccountInfoResponse,
    GetNewApiKeyResponse,
    BuildDeleteAccountTransactionResponse,
    SubmitDeleteAccountTransactionRequest,
    SubmitDeleteAccountTransactionResponse,
    GetDepositInfoRequest,
    GetDepositInfoResponse,
} from '../../types';
import { Api } from '../api';
import { Asset } from '@meshsdk/core';

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

    public getBalance(): Promise<GetBalanceResponse> {
        const res = this.axiosInstance.get('/accounts/balance');
        return this.resolveAxiosData(res);
    }

    public getOrders(): Promise<GetOrdersResponse> {
        const res = this.axiosInstance.get('/accounts/orders');
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

    // eslint-disable-next-line class-methods-use-this
    public getDepositInfo(data: GetDepositInfoRequest): Promise<GetDepositInfoResponse> {
        // const res = this.axiosInstance.get('/accounts/deposit-info', { params: data });
        // return this.resolveAxiosData(res);
        const mockGetDepositInfoResponse: GetDepositInfoResponse = {
            total_deposit: {
                // Intended to deposit 1000 ADA and 2000 USDX
                amount: [
                    { unit: 'lovelace', quantity: '1000000000' },
                    {
                        unit: '5066154a102ee037390c5236f78db23239b49c5748d3d349f3ccf04b55534458',
                        quantity: '2000000000',
                    },
                ],
                postDepositBalance: {
                    total: {
                        lovelace: 1_500_000_000n,
                        '5066154a102ee037390c5236f78db23239b49c5748d3d349f3ccf04b55534458':
                            4_000_000_000n,
                    },
                    available_for_trade: {
                        lovelace: 1_000_000_000n,
                        '5066154a102ee037390c5236f78db23239b49c5748d3d349f3ccf04b55534458':
                            3_000_000_000n,
                    },
                    available_for_withdrawal: {
                        lovelace: 1_000_000_000n,
                        '5066154a102ee037390c5236f78db23239b49c5748d3d349f3ccf04b55534458':
                            3_000_000_000n,
                    },
                    held_for_order: {
                        lovelace: 500_000_000n,
                        '5066154a102ee037390c5236f78db23239b49c5748d3d349f3ccf04b55534458':
                            1_000_000_000n,
                    },
                    spending_settling: {
                        lovelace: 0n,
                        '5066154a102ee037390c5236f78db23239b49c5748d3d349f3ccf04b55534458': 0n,
                    },
                    depositing_settling: {
                        lovelace: 0n,
                        '5066154a102ee037390c5236f78db23239b49c5748d3d349f3ccf04b55534458': 0n,
                    },
                },
            },
            suggested_deposit: {
                amount: [
                    { unit: 'lovelace', quantity: '100000000' },
                    {
                        unit: '5066154a102ee037390c5236f78db23239b49c5748d3d349f3ccf04b55534458',
                        quantity: '200000000',
                    },
                ],
                postDepositBalance: {
                    total: {
                        lovelace: 1_600_000_000n,
                        '5066154a102ee037390c5236f78db23239b49c5748d3d349f3ccf04b55534458':
                            4_200_000_000n,
                    },
                    available_for_trade: {
                        lovelace: 1_100_000_000n,
                        '5066154a102ee037390c5236f78db23239b49c5748d3d349f3ccf04b55534458':
                            3_200_000_000n,
                    },
                    available_for_withdrawal: {
                        lovelace: 1_100_000_000n,
                        '5066154a102ee037390c5236f78db23239b49c5748d3d349f3ccf04b55534458':
                            3_200_000_000n,
                    },
                    held_for_order: {
                        lovelace: 500_000_000n,
                        '5066154a102ee037390c5236f78db23239b49c5748d3d349f3ccf04b55534458':
                            1_000_000_000n,
                    },
                    spending_settling: {
                        lovelace: 0n,
                        '5066154a102ee037390c5236f78db23239b49c5748d3d349f3ccf04b55534458': 0n,
                    },
                    depositing_settling: {
                        lovelace: 0n,
                        '5066154a102ee037390c5236f78db23239b49c5748d3d349f3ccf04b55534458': 0n,
                    },
                },
            },
        };
        return new Promise((resolve) => {
            resolve(mockGetDepositInfoResponse);
        });
    }
}
