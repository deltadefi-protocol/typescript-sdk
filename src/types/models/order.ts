export type TradingSymbol = 'ADAUSDM';

export type OrderStatus =
    | 'processing'
    | 'open'
    | 'fully_filled'
    | 'partially_filled'
    | 'cancelled'
    | 'partially_cancelled'
    | 'failed';

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

export type OrderExecutionRole = 'maker' | 'taker';

export type OrderExecutionRecordJSON = {
    id: string;
    order_id: string;
    execution_price: number;
    filled_amount: string;
    fee_unit: string;
    fee_amount: string;
    role: OrderExecutionRole;
    counter_party_order_id: string;
    create_time: number;
};

export type OrderJSON = {
    order_id: string;
    status: OrderStatus;
    symbol: TradingSymbol;
    orig_qty: string;
    executed_qty: string;
    side: OrderSide;
    price: number;
    type: OrderType;
    fee_charged: string;
    fee_unit: string;
    executed_price: number;
    slippage: string;
    create_time: number;
    update_time: number;
    fills?: OrderExecutionRecordJSON[];
};

export type OrderFillingRecordJSON = {
    execution_id: string;
    order_id: string;
    status: OrderStatus;
    symbol: TradingSymbol;
    executed_qty: string;
    side: OrderSide;
    type: OrderType;
    fee_charged: string;
    fee_unit: string;
    executed_price: number;
    created_time: number;
};
