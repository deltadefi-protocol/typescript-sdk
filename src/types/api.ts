import { AppWalletKeyType } from '@meshsdk/core';
import { AuthHeaders } from './auth';

export type ApiConfig = {
    networkId?: 0 | 1;
    signingKey?: AppWalletKeyType;
} & AuthHeaders;
