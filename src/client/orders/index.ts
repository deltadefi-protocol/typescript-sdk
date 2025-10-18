import { AxiosInstance } from 'axios';
import {
    BuildCancelOrderTransactionResponse,
    BuildPlaceOrderTransactionRequest,
    BuildPlaceOrderTransactionResponse,
    SubmitPlaceOrderTransactionRequest,
    SubmitPlaceOrderTransactionResponse,
    SubmitCancelOrderTransactionRequest,
    BuildCancelAllOrdersTransactionResponse,
    SubmitCancelAllOrdersTransactionResponse,
    SubmitCancelAllOrdersTransactionRequest,
} from '../../types';
import { Api } from '../api';

/**
 * Represents the Orders class.
 */
export class Orders extends Api {
    private axiosInstance: AxiosInstance;

    /**
     * Creates an instance of Orders.
     * @param axiosInstance - The Axios instance for making HTTP requests.
     */
    constructor(axiosInstance: AxiosInstance) {
        super();
        this.axiosInstance = axiosInstance;
    }

    /**
     * Builds a place order transaction.
     * @param data - The build place order transaction request data.
     * @returns A promise that resolves to the build place order transaction response.
     */
    public buildPlaceOrderTransaction(
        data: BuildPlaceOrderTransactionRequest,
    ): Promise<BuildPlaceOrderTransactionResponse> {
        const res = this.axiosInstance.post('/order/build', data);
        return this.resolveAxiosData(res);
    }

    /**
     * Builds a cancel order transaction.
     * @param orderId - The ID of the order to cancel.
     * @returns A promise that resolves to the build cancel order transaction response.
     */
    public buildCancelOrderTransaction(
        orderId: string,
    ): Promise<BuildCancelOrderTransactionResponse> {
        const res = this.axiosInstance.delete(`/order/${orderId}/build`);
        return this.resolveAxiosData(res);
    }

    /**
     * Builds cancel all orders transactions.
     * @returns A promise that resolves to the build cancel all orders transaction response.
     */
    public buildCancelAllOrdersTransaction(): Promise<BuildCancelAllOrdersTransactionResponse> {
        const res = this.axiosInstance.delete(`/order/cancel-all/build`);
        return this.resolveAxiosData(res);
    }

    /**
     * Submits a place order transaction.
     * @param data - The submit place order transaction request data.
     * @returns A promise that resolves to the submit place order transaction response.
     */
    public submitPlaceOrderTransaction(
        data: SubmitPlaceOrderTransactionRequest,
    ): Promise<SubmitPlaceOrderTransactionResponse> {
        const res = this.axiosInstance.post('/order/submit', data);
        return this.resolveAxiosData(res);
    }

    /**
     * Submits a cancel order transaction.
     * @param data - The submit cancel order transaction request data.
     * @returns The transaction hash of cancelled order.
     */
    public async submitCancelOrderTransaction(
        data: SubmitCancelOrderTransactionRequest,
    ): Promise<object> {
        const res = this.axiosInstance.delete('/order/submit', { data });
        return this.resolveAxiosData(res);
    }

    /**
     * Submits cancel all orders transaction.
     * @param data - The submit cancel all orders transaction request data.
     * @returns The transaction hash of cancelled all orders.
     */
    public async submitCancelAllOrdersTransaction(
        data: SubmitCancelAllOrdersTransactionRequest,
    ): Promise<SubmitCancelAllOrdersTransactionResponse> {
        const res = this.axiosInstance.delete('/order/cancel-all/submit', { data });
        return this.resolveAxiosData(res);
    }
}
