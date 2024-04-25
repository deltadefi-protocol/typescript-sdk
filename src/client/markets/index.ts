import { AxiosInstance } from 'axios';
import { Api } from '../api';
import { GetDepthRequest, GetDepthResponse } from '../../types';

export class Markets extends Api {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        super();
        this.axiosInstance = axiosInstance;
    }

    public getDepth(data: GetDepthRequest): Promise<GetDepthResponse> {
        const { pair } = data;
        const res = this.axiosInstance.get(`/market/depth?pair=${pair}`);
        return this.resolveAxiosData(res);
    }
}
