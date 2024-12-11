export type TradingSymbol = 'ADAUSDX';

export type OrderStatus = 'building' | 'open' | 'closed' | 'failed' | 'cancelled';

export type OrderSide = 'buy' | 'sell';

export const OrderSides = {
    BuyOrder: 'buy' as OrderSide,
    SellOrder: 'sell' as OrderSide,
};

export type OrderType = 'market' | 'limit';

export const OrderTypes = {
    MarketOrder: 'market' as OrderType,
    LimitOrder: 'limit' as OrderType,
};

export type OrderJSON = {
    order_id: string;
    status: OrderStatus;
    symbol: TradingSymbol;
    orig_qty: string;
    executed_qty: string;
    side: OrderSide;
    price: string;
    type: OrderType;
    fee_amount: number;
    executed_price: number;
    slippage: string;
    create_time: number;
    update_time: number;
};
