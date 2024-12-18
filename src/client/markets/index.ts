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

export class Markets extends Api {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        super();
        this.axiosInstance = axiosInstance;
    }

    public getDepth(data: GetMarketDepthRequest): Promise<GetMarketDepthResponse> {
        const { pair } = data;
        const res = this.axiosInstance.get(`/market/depth?pair=${pair}`);
        return this.resolveAxiosData(res);
    }

    public getMarketPrice(data: GetMarketPriceRequest): Promise<GetMarketPriceResponse> {
        const { pair } = data;
        const res = this.axiosInstance.get(`/market/market-price?pair=${pair}`);
        return this.resolveAxiosData(res);
    }

    public getAggregatedPrice(
        data: GetAggregatedPriceRequest,
    ): Promise<GetAggregatedPriceResponse> {
        const { pair, interval, start, end } = data;
        const res = this.axiosInstance.get(
            `/market/aggregate/${pair}?interval=${interval}&start=${start || ''}&end=${end || ''}`,
        );
        return this.resolveAxiosData(res);
    }
}
