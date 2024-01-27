export type AuthHeaders = {
    jwt?: string;
    apiKey?: string;
};

export type ApiHeaders = {
    'Content-Type': string;
    Authorization?: string;
    'X-API-KEY'?: string;
};
