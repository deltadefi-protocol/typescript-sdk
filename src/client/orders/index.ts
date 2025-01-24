import { AxiosInstance } from 'axios';
import {
    BuildCancelOrderTransactionResponse,
    BuildPlaceOrderTransactionRequest,
    BuildPlaceOrderTransactionResponse,
    SubmitPlaceOrderTransactionRequest,
    SubmitPlaceOrderTransactionResponse,
    SubmitCancelOrderTransactionRequest,
    SubmitCancelOrderTransactionResponse,
} from '../../types';
import { Api } from '../api';

export class Orders extends Api {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        super();
        this.axiosInstance = axiosInstance;
    }

    public buildPlaceOrderTransaction(
        data: BuildPlaceOrderTransactionRequest,
    ): Promise<BuildPlaceOrderTransactionResponse> {
        const res = this.axiosInstance.post('/order/build', data);
        return this.resolveAxiosData(res);
    }

    public buildCancelOrderTransaction(
        orderId: string,
    ): Promise<BuildCancelOrderTransactionResponse> {
        const res = this.axiosInstance.delete(`/order/${orderId}/build`);
        return this.resolveAxiosData(res);
    }

    public submitPlaceOrderTransaction(
        data: SubmitPlaceOrderTransactionRequest,
    ): Promise<SubmitPlaceOrderTransactionResponse> {
        const res = this.axiosInstance.post('/order/submit', data);
        return this.resolveAxiosData(res);
    }

    public submitCancelOrderTransaction(
        data: SubmitCancelOrderTransactionRequest,
    ): Promise<SubmitCancelOrderTransactionResponse> {
        const res = this.axiosInstance.delete('/order/submit', { data });
        return this.resolveAxiosData(res);
    }
}
