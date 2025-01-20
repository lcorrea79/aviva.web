//--------------------------------------------------------------------------------------
// Imports Section (Libraries)
//--------------------------------------------------------------------------------------
import { createSelector }       from '@ngrx/store';
import { AppState }             from '../state/app.state';
//--------------------------------------------------------------------------------------
// Imports Section (State Slices)
//--------------------------------------------------------------------------------------
import { IProductState }       from '../state/product.state';
//-------------------------------------------------------------------------------------
// State Slices Definition Section:
//-------------------------------------------------------------------------------------
const selectProducts = (state: AppState) => state.product;
//-------------------------------------------------------------------------------------
// Slices Section:
//-------------------------------------------------------------------------------------
export const selectProductList = createSelector(selectProducts, (state: IProductState) => state.products);
export const selectSelectedProduct = createSelector(selectProducts, (state: IProductState) => state.selectedProduct);
export const selectProductError = createSelector(selectProducts, (state: IProductState) => state.error);
export const selectProductLoading = createSelector(selectProducts, (state: IProductState) => state.loading);