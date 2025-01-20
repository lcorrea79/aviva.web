//--------------------------------------------------------------------------------------
// Import Section (for sub states):
//--------------------------------------------------------------------------------------

import * as fromProduct from './product.state';
import * as fromOrder from './order.state';
//-------------------------------------------------
//--------------------------------------------------------------------------------------
// AppState Definition Section:
//--------------------------------------------------------------------------------------
export interface AppState {
  product: fromProduct.IProductState;
  order: fromOrder.IOrderState;
}

//--------------------------------------------------------------------------------------
// AppState Initial State Section:
//--------------------------------------------------------------------------------------
export const initialAppState: AppState = { 
  product: fromProduct.initialProductState ,
  order: fromOrder.initialOrderState
};
//--------------------------------------------------------------------------------------
export function getInitialState(): AppState {
  return initialAppState;
}
