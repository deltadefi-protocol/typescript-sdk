import { AxiosInstance } from 'axios';
import { Api } from '../api';
import {
    GetMarketDepthRequest,
    GetMarketDepthResponse,
    GetMarketPriceRequest,
    GetMarketPriceResponse,
    GetAggregatedPriceResponse,
    GetAggregatedPriceRequest,
} from '../../types';

/**
 * Represents the Markets class.
 */
export class Markets extends Api {
    private axiosInstance: AxiosInstance;

    /**
     * Creates an instance of Markets.
     * @param axiosInstance - The Axios instance for making HTTP requests.
     */
    constructor(axiosInstance: AxiosInstance) {
        super();
        this.axiosInstance = axiosInstance;
    }

    /**
     * Retrieves the market depth.
     * @param data - The market depth request data.
     * @returns A promise that resolves to the market depth response.
     */
    public getDepth(data: GetMarketDepthRequest): Promise<GetMarketDepthResponse> {
        const { symbol } = data;
        const res = this.axiosInstance.get(`/market/depth?symbol=${symbol}`);
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves the market price.
     * @param data - The market price request data.
     * @returns A promise that resolves to the market price response.
     */
    public getMarketPrice(data: GetMarketPriceRequest): Promise<GetMarketPriceResponse> {
        const { symbol } = data;
        const res = this.axiosInstance.get(`/market/market-price?symbol=${symbol}`);
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves the aggregated price data.
     * @param data - The aggregated price request data.
     * @returns A promise that resolves to the aggregated price response.
     */
    public getAggregatedPrice(
        data: GetAggregatedPriceRequest,
    ): Promise<GetAggregatedPriceResponse> {
        const { pair, interval, start, end } = data;
        const res = this.axiosInstance.get(
            `/market/graph/${pair}?interval=${interval}&start=${start || ''}&end=${end || ''}`,
        );
        return this.resolveAxiosData(res);
    }
}
