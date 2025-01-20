//--------------------------------------------------------------------------------------
//  Model definition
//--------------------------------------------------------------------------------------
import { IProduct, IProductResponse } from '../../data/models/product.model';
//--------------------------------------------------------------------------------------
//  State definition
//--------------------------------------------------------------------------------------
export interface IProductState {
    products: IProduct[];
    selectedProduct: IProduct;
    error               : any;
    loading             : boolean;
}
//--------------------------------------------------------------------------------------
//  Initial state
//--------------------------------------------------------------------------------------
export const initialProductState: IProductState = {
    products           : null,
    selectedProduct   : null,
    error               : null,
    loading             : false
};