export type TradingSymbol = 'ADAUSDM' | 'HOSKYUSDM' | 'NIGHTUSDM' | 'IAGUSDM' | 'SNEKUSDM';

export type OrderStatus =
    | 'building'
    | 'processing'
    | 'open'
    | 'closed'
    | 'failed'
    | 'cancelled';

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

export type OrderExecutionRecordResponse = {
    id: string;
    order_id: string;
    account_id: string;
    execution_price: string;
    filled_base_qty: string;
    filled_quote_qty: string;
    commission_unit: string;
    commission: string;
    role: OrderExecutionRole;
    counter_party_order_id: string;
    created_at: string;
};

export type OrderResponse = {
    id: string;
    account_id: string;
    active_order_utxo_id?: string;
    status: OrderStatus;
    symbol: TradingSymbol;
    base_qty: string;
    quote_qty: string;
    side: OrderSide;
    price: string;
    type: OrderType;
    slippage_bp?: number;
    market_order_limit_price?: string;
    locked_base_qty: string;
    locked_quote_qty: string;
    executed_base_qty: string;
    executed_quote_qty: string;
    ob_open_order_base_qty: string;
    commission_unit: string;
    commission: string;
    commission_rate_bp: number;
    executed_price: string;
    created_at: string;
    updated_at: string;
    order_execution_records?: OrderExecutionRecordResponse[];
};
