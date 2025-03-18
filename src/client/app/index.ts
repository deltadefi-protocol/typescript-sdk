import { AxiosInstance } from 'axios';
import { Api } from '../api';
import { GetHydraCycleResponse, GetTermsAndConditionResponse } from '../../types';

/**
 * Represents the App class.
 */
export class App extends Api {
    private axiosInstance: AxiosInstance;

    /**
     * Creates an instance of App.
     * @param axiosInstance - The Axios instance for making HTTP requests.
     */
    constructor(axiosInstance: AxiosInstance) {
        super();
        this.axiosInstance = axiosInstance;
    }

    /**
     * Retrieves the terms and conditions.
     * @returns A promise that resolves to the terms and conditions response.
     */
    public getTermsAndCondition(): Promise<GetTermsAndConditionResponse> {
        const res = this.axiosInstance.get('/app/terms-and-conditions');
        return this.resolveAxiosData(res);
    }

    /**
     * Retrieves the Hydra cycle.
     * @returns A promise that resolves to the Hydra cycle response.
     */
    public getHydraCycle(): Promise<GetHydraCycleResponse> {
        const res = this.axiosInstance.get('/app/hydra-cycle');
        return this.resolveAxiosData(res);
    }
}
