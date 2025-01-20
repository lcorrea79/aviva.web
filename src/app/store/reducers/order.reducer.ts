//-------------------------------------------------------------------------------------
// Imports Section:
//-------------------------------------------------------------------------------------
import { Action }                       from '@ngrx/store';
import { createReducer }                from '@ngrx/store';
import { on }                           from '@ngrx/store';
//-------------------------------------------------------------------------------------
import { IOrderState }               from '../state/order.state';
import { initialOrderState }         from '../state/order.state';
import { orderActions } from '../actions/order.action';
//-------------------------------------------------------------------------------------
// Reducer Section:
//-------------------------------------------------------------------------------------
export const orderReducer = createReducer(
    initialOrderState,
    on(orderActions.loadOrders, (state: IOrderState) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(orderActions.loadOrdersSuccess, (state: IOrderState, {orders}) => {
        return {
            ...state,
            orders,
            loading: false,
            error: null
        };
    }),
    on(orderActions.loadOrdersFailure, (state: IOrderState, {error}) => {
        return {
            ...state,
            error,
            loading: false
        };
    }),
    on(orderActions.loadOrder, (state: IOrderState) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(orderActions.loadOrderSuccess, (state: IOrderState, { order }) => {
        return {
            ...state,
            selectedOrder: order,
            loading: false,
            error: null
        };
    }),
    on(orderActions.loadOrderFailure, (state: IOrderState, {error}) => {
        return {
            ...state,
            error,
            loading: false
        };
    }),    
    on(orderActions.createOrder, (state: IOrderState) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(orderActions.createOrderSuccess, (state: IOrderState) => {
        return {
            ...state,
            loading: false,
            error: null
        };
    }),
    on(orderActions.createOrderFailure, (state: IOrderState, {error}) => {
        return {
            ...state,
            error,
            loading: false
        };
    }),
    on(orderActions.cancelOrder, (state: IOrderState) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(orderActions.cancelOrderSuccess, (state: IOrderState) => {
        return {
            ...state,
            loading: false,
            error: null
        };
    }),
    on(orderActions.cancelOrderFailure, (state: IOrderState, {error}) => {
        return {
            ...state,
            error,
            loading: false
        };
    }),
    on(orderActions.payOrder, (state: IOrderState) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(orderActions.payOrderSuccess, (state: IOrderState) => {
        return {
            ...state,
            loading: false,
            error: null
        };
    }),
    on(orderActions.payOrderFailure, (state: IOrderState, {error}) => {
        return {
            ...state,
            error,
            loading: false
        };
    })
);
//-------------------------------------------------------------------------------------
// Reducer Function:
//-------------------------------------------------------------------------------------
export function reducer(state: IOrderState | undefined, action: Action) {
    orderReducer(state, action);
}
