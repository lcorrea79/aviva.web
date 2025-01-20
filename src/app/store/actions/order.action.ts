//----------------------------------------------------------------------
// Imports Section (Ngrx)
//----------------------------------------------------------------------
import { createActionGroup, emptyProps, props }   from '@ngrx/store';
//----------------------------------------------------------------------
// Imports Section (Models)
//----------------------------------------------------------------------
import { IOrder, IOrderProvider, IOrderRequest, IOrderResponse } from '../../data/models/order.model';
//----------------------------------------------------------------------
//  (Actions)
//----------------------------------------------------------------------

export const orderActions = createActionGroup({
  source: 'Order',
  events: {
    'Load Orders'                : emptyProps(),
    'Load Orders Success'        : props<{orders: IOrder[]}>(),
    'Load Orders Failure'        : props<{error: any}>(),
    'Load Order'                 : props<{id: string}>(),
    'Load Order Success'         : props<{order: IOrderProvider}>(),
    'Load Order Failure'         : props<{error: any}>(),
    'Create Order'               : props<{ order: IOrderRequest }>(),
    'Create Order Success'       : emptyProps(),
    'Create Order Failure'       : props<{error: any}>(),
    'Cancel Order'               : props<{ id: string }>(),
    'Cancel Order Success'       : emptyProps(),
    'Cancel Order Failure'       : props<{error: any}>(),
    'Pay Order'                  : props<{ id: string}>(),
    'Pay Order Success'          : emptyProps(),
    'Pay Order Failure'          : props<{error: any}>(),
  }
});