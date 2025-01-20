//--------------------------------------------------------------------------------------
//  Model definition
//--------------------------------------------------------------------------------------
import { IOrder, IOrderProvider, IOrderResponse } from '../../data/models/order.model';
//--------------------------------------------------------------------------------------
//  State definition
//--------------------------------------------------------------------------------------
export interface IOrderState {
    orders: IOrder[];
    selectedOrder: IOrderProvider;
    error               : any;
    loading             : boolean;
}
//--------------------------------------------------------------------------------------
//  Initial state
//--------------------------------------------------------------------------------------
export const initialOrderState: IOrderState = {
    orders           : null,
    selectedOrder   : null,
    error               : null,
    loading             : false
};