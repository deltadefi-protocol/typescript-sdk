import { AxiosInstance } from 'axios';
import { Api } from '../api';
import { GetHydraCycleResponse, GetTermsAndConditionResponse } from '../../types';

export class App extends Api {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        super();
        this.axiosInstance = axiosInstance;
    }

    public getTermsAndCondition(): Promise<GetTermsAndConditionResponse> {
        const res = this.axiosInstance.get('/app/terms-and-conditions');
        return this.resolveAxiosData(res);
    }

    public getHydraCycle(): Promise<GetHydraCycleResponse> {
        const res = this.axiosInstance.get('/app/hydra-cycle');
        return this.resolveAxiosData(res);
    }
}
