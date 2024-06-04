import { TimeInForce, TradingPair, TradingSide, TradingType } from '../constant';

export type OrderStatus =
    | 'build'
    | 'pending'
    | 'open'
    // | 'pending_cancel'
    | 'cancelled'
    | 'partial_filled'
    | 'pending_settle'
    | 'fully_filled'
    | 'failed';

export type Order = {
    pair: TradingPair;
    order_id: string;
    price: string;
    slippage: number;
    orig_qty: string;
    executed_qty: string;
    settling_qty: string;
    status: OrderStatus;
    time_in_force: TimeInForce;
    expiry_time: number;
    type: TradingType;
    side: TradingSide;
    create_time: number;
    update_time: number;
};
