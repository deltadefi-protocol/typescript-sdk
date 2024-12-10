import { AxiosInstance } from 'axios';
import { Api } from '../api';
import { GetTermsAndConditionResponse } from '../../types';

export class App extends Api {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        super();
        this.axiosInstance = axiosInstance;
    }

    public getTermsAndCondition(): Promise<GetTermsAndConditionResponse> {
        const res = this.axiosInstance.get('/terms-and-conditions');
        return this.resolveAxiosData(res);
    }
}
