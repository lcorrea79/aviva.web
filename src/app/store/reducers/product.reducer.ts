//-------------------------------------------------------------------------------------
// Imports Section:
//-------------------------------------------------------------------------------------
import { Action }                       from '@ngrx/store';
import { createReducer }                from '@ngrx/store';
import { on }                           from '@ngrx/store';
//-------------------------------------------------------------------------------------
import { IProductState }               from '../state/product.state';
import { initialProductState }         from '../state/product.state';
import { productActions } from '../actions/product.action';
//-------------------------------------------------------------------------------------
// Reducer Section:
//-------------------------------------------------------------------------------------
export const productReducer = createReducer(
    initialProductState,
    on(productActions.loadProducts, (state: IProductState) => {       
        return {
            ...state,
            loading: true
        };
    }),
    on(productActions.loadProductsSuccess, (state: IProductState, {products}) => {
        return {
            ...state,
            products,
            loading: false,
            error: null
        };
    }),
    on(productActions.loadProductsFailure, (state: IProductState, {error}) => {
        return {
            ...state,
            error,
            loading: false
        };
    }),
    on(productActions.loadProduct, (state: IProductState) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(productActions.loadProductSuccess, (state: IProductState, { product }) => {
        return {
            ...state,
            selectedProduct: product,
            loading: false,
            error: null
        };
    }),
    on(productActions.loadProductFailure, (state: IProductState, {error}) => {
        return {
            ...state,
            error,
            loading: false
        };
    }),
    on(productActions.loadProductsByName, (state: IProductState) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(productActions.loadProductsByNameSuccess, (state: IProductState, {products}) => {
        return {
            ...state,
            products,
            loading: false,
            error: null
        };
    }),
    on(productActions.loadProductsByNameFailure, (state: IProductState, {error}) => {
        return {
            ...state,
            error,
            loading: false
        };
    }),
    on(productActions.createProduct, (state: IProductState) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(productActions.createProductSuccess, (state: IProductState) => {
        return {
            ...state,
            loading: false,
            error: null
        };
    }),
    on(productActions.createProductFailure, (state: IProductState, {error}) => {
        return {
            ...state,
            error,
            loading: false
        };
    }),
    on(productActions.updateProduct, (state: IProductState) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(productActions.updateProductSuccess, (state: IProductState) => {
        return {
            ...state,
            loading: false,
            error: null
        };
    }),
    on(productActions.updateProductFailure, (state: IProductState, {error}) => {
        return {
            ...state,
            error,
            loading: false
        };
    }),
    on(productActions.deleteProduct, (state: IProductState) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(productActions.deleteProductSuccess, (state: IProductState) => {
        return {
            ...state,
            loading: false,
            error: null
        };
    }),
    on(productActions.deleteProductFailure, (state: IProductState, {error}) => {
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
export function reducer(state: IProductState | undefined, action: Action) {
    productReducer(state, action);
}
