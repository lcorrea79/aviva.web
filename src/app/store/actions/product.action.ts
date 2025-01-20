//----------------------------------------------------------------------
// Imports Section (Ngrx)
//----------------------------------------------------------------------
import { createActionGroup, emptyProps, props }   from '@ngrx/store';
//----------------------------------------------------------------------
// Imports Section (Models)
//----------------------------------------------------------------------
import { IProduct, IProductResponse } from '../../data/models/product.model';
//----------------------------------------------------------------------
//  (Actions)
//----------------------------------------------------------------------

export const productActions = createActionGroup({
  source: 'Product',
  events: {
    'Load Products'                : emptyProps(),
    'Load Products Success'        : props<{products: IProduct[]}>(),
    'Load Products Failure'        : props<{error: any}>(),
    'Load Product'                 : props<{id: number}>(),
    'Load Product Success'         : props<{product: IProduct}>(),
    'Load Product Failure'         : props<{error: any}>(),
    'Load Products By Name'         : props<{name: string}>(),
    'Load Products By Name Success' : props<{products: IProduct[]}>(),
    'Load Products By Name Failure' : props<{error: any}>(),
    'Create Product': props<{ product: IProduct}>(),
    'Create Product Success': emptyProps(),
    'Create Product Failure'       : props<{error: any}>(),
    'Update Product': props<{ product: IProduct}>(),
    'Update Product Success': emptyProps(),
    'Update Product Failure'       : props<{error: any}>(),
    'Delete Product': props<{ id: number}>(),
    'Delete Product Success': emptyProps(),
    'Delete Product Failure'       : props<{error: any}>(),
  }
});