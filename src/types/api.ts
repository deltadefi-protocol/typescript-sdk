import { MeshWallet } from '@meshsdk/core';
import { AuthHeaders } from './auth';

export type ApiConfig = {
    network?: 'preprod' | 'mainnet';
    masterWallet?: MeshWallet;
} & AuthHeaders;
