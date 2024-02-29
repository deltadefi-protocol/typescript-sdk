import { TradingPair, TradingSide, TradingType } from 'types/constant';

export type Order = {
    id: string;
    expiry: string;
    trading_pair: TradingPair;
    order_type: TradingType;
    order_side: TradingSide;
    slippage: number;
    price: number;
    total_quantity: number;
    owner: string;
    order_status: string;
    created_at: string;
    updated_at: string;
};
