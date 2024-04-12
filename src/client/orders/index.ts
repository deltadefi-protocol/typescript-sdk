import { AxiosInstance } from 'axios';
import {
    BuildPostOrderTransactionRequest,
    BuildPostOrderTransactionResponse,
    SubmitPostOrderTransactionRequest,
    SubmitPostOrderTransactionResponse,
} from '../../types';
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

    public submitPostOrderTransactionRequest(
        data: SubmitPostOrderTransactionRequest,
    ): Promise<SubmitPostOrderTransactionResponse> {
        const res = this.axiosInstance.post('/order/submit', data);
        return this.resolveAxiosData(res);
    }

    public cancelOrder(orderId: string): Promise<void> {
        const res = this.axiosInstance.delete(`/order/${orderId}`);
        return this.resolveAxiosData(res);
    }
}
