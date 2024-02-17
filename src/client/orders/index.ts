import { AxiosInstance } from 'axios';
import { BuildPostOrderTransactionRequest, BuildPostOrderTransactionResponse } from '../../types';
import { Api } from '../api';

export class Orders extends Api {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        super();
        this.axiosInstance = axiosInstance;
    }

    public buildPostOrderTransaction(
        data: BuildPostOrderTransactionRequest,
    ): Promise<BuildPostOrderTransactionResponse> {
        const res = this.axiosInstance.post('/order/build', data);
        return this.resolveAxiosData(res);
    }

    // public submitPostOrderTransactionRequest(
    //     data: SubmitDepositTransactionRequest,
    // ): Promise<SubmitDepositTransactionResponse> {
    //     const res = this.axiosInstance.post('/accounts/deposit/submit', data);
    //     return this.resolveAxiosData(res);
    // }
}
