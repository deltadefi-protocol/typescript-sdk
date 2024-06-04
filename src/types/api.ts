import { AppWalletKeyType } from '@meshsdk/core';
import { AuthHeaders } from './auth';

export type ApiConfig = {
    network?: 'preprod' | 'mainnet';
    signingKey?: AppWalletKeyType;
} & AuthHeaders;
