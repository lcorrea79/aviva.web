//--------------------------------------------------------------------------------------
// Imports Section (Libraries)
//--------------------------------------------------------------------------------------
import { createSelector }       from '@ngrx/store';
import { AppState }             from '../state/app.state';
//--------------------------------------------------------------------------------------
// Imports Section (State Slices)
//--------------------------------------------------------------------------------------
import { IOrderState }       from '../state/order.state';
//-------------------------------------------------------------------------------------
// State Slices Definition Section:
//-------------------------------------------------------------------------------------
const selectOrders = (state: AppState) => state.order;
//-------------------------------------------------------------------------------------
// Slices Section:
//-------------------------------------------------------------------------------------
export const selectOrderList = createSelector(selectOrders, (state: IOrderState) => state.orders);
export const selectSelectedOrder = createSelector(selectOrders, (state: IOrderState) => state.selectedOrder);
export const selectOrderError = createSelector(selectOrders, (state: IOrderState) => state.error);
export const selectOrderLoading = createSelector(selectOrders, (state: IOrderState) => state.loading);