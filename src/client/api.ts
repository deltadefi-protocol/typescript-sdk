/* eslint-disable class-methods-use-this */
import { AxiosResponse } from 'axios';

export class Api {
    protected resolveAxiosData = <T>(response: Promise<AxiosResponse<T>>): Promise<T> =>
        response.then((res) => res.data);
}
