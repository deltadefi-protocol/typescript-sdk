import { TimeInForce, TradingPair, TradingSide, TradingType } from '../constant';

export type OrderStatus =
    | 'build'
    | 'pending'
    | 'open'
    | 'pending_cancel'
    | 'cancelled'
    | 'pending_settle'
    | 'partial_filled'
    | 'fully_filled';

export type Order = {
    pair: TradingPair;
    order_id: string;
    slippage: number;
    price: string;
    orig_qty: string;
    executed_qty: string;
    status: OrderStatus;
    time_in_force: TimeInForce;
    expiry_time: number;
    type: TradingType;
    side: TradingSide;
    create_time: number;
    update_time: number;
};
