# UTxO Orderbook TypeScript SDK

The UTxO Orderbook TypeScript SDK provides a convenient way to interact with the DeltaDefi API. It includes classes and methods for managing accounts, orders, markets, and wallets.

## Installation

To install the SDK, use npm:

```sh
npm i @deltadefi-protocol/typescript-sdk
```

## Usage

### Importing the SDK

```typescript
import { ApiClient } from 'deltadefi-typescript-sdk';
```

### Creating an Instance

```typescript
const apiClient = new ApiClient({
    network: 'preprod',
    jwt: 'your-jwt-token',
    apiKey: 'your-api-key',
    signingKey: 'your-signing-key',
});
```

### Sign In

```typescript
const signInData: SignInRequest = {
    x_api_key: 'your-api-key',
    wallet_address: 'your-wallet-address',
};

apiClient.accounts
    .signIn(signInData)
    .then((response) => {
        console.log('Sign-in successful:', response);
    })
    .catch((error) => {
        console.error('Error during sign-in:', error);
    });
```

### Orders

```typescript
const postOrderData: PostOrderRequest = {
    symbol: 'ADAUSDX',
    side: 'buy',
    type: 'limit',
    quantity: 100,
    price: 1.5,
    max_slippage: true,
};

apiClient
    .postOrder(postOrderData)
    .then((response) => {
        console.log('Order posted successfully:', response);
    })
    .catch((error) => {
        console.error('Error posting order:', error);
    });
```

### Markets

```typescript
const marketDepthData: GetMarketDepthRequest = {
    pair: 'ADAUSDX',
};

apiClient.markets
    .getDepth(marketDepthData)
    .then((response) => {
        console.log('Market depth:', response);
    })
    .catch((error) => {
        console.error('Error getting market depth:', error);
    });
```

### Wallet

```typescript
const txHex = 'your-transaction-hex';

apiClient.wallet
    ?.signTx(txHex)
    .then((signedTx) => {
        console.log('Signed transaction:', signedTx);
    })
    .catch((error) => {
        console.error('Error signing transaction:', error);
    });
```

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

```
http://www.apache.org/licenses/LICENSE-2.0
```
