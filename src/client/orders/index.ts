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
    CancelOrderResponse,
    CancelAllOrdersResponse,
    CancelAllOrdersRequest,
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
     * Cancels an order by ID.
     * @param orderId - The ID of the order to cancel.
     * @returns A promise that resolves to the cancel order response.
     */
    public cancelOrder(orderId: string): Promise<CancelOrderResponse> {
        const res = this.axiosInstance.post(`/order/${orderId}/cancel`);
        return this.resolveAxiosData(res);
    }

    /**
     * Cancels all open orders for a symbol.
     * @param data - The cancel all orders request containing the symbol.
     * @returns A promise that resolves to the cancel all orders response.
     */
    public cancelAllOrders(data: CancelAllOrdersRequest): Promise<CancelAllOrdersResponse> {
        const res = this.axiosInstance.post('/order/cancel-all', data);
        return this.resolveAxiosData(res);
    }

    /**
     * @deprecated Use cancelOrder() instead. This method will be removed in a future version.
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
     * @deprecated Use cancelAllOrders() instead. This method will be removed in a future version.
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
     * @deprecated Use cancelOrder() instead. This method will be removed in a future version.
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
     * @deprecated Use cancelAllOrders() instead. This method will be removed in a future version.
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
