//--------------------------------------------------------------------------------------
// Imports Section (Libraries)
//--------------------------------------------------------------------------------------
import { Injectable } 			from '@angular/core';
//--------------------------------------------------------------------------------------
// Imports Section (Ngrx)
//--------------------------------------------------------------------------------------
import {
	Actions,
	createEffect,
	ofType
} 								          from '@ngrx/effects';
//--------------------------------------------------------------------------------------
// Imports Section (Rxjs)
//--------------------------------------------------------------------------------------
import {
	catchError,
	map,
	switchMap,
	mergeMap,
	concatMap
} from 'rxjs/operators';
import { of } 					    from 'rxjs';
//--------------------------------------------------------------------------------------
// Imports Section (Services)
//--------------------------------------------------------------------------------------
import * as services from 'src/app/data/services/product.service';
//--------------------------------------------------------------------------------------
// Imports Section (Actions)
//--------------------------------------------------------------------------------------
import { productActions } 	from '../actions/product.action';



@Injectable()
export class ProductEffects {
  	//----------------------------------------------------------------------------------
	// Constructor Method Section
	//----------------------------------------------------------------------------------
  	constructor(
		private actions$: Actions,
		private productService: services.ProductService
		) {}
    //----------------------------------------------------------------------------------
	// Effects Section
	//----------------------------------------------------------------------------------
	loadProducts$ = createEffect(() => this.actions$.pipe(
		ofType(productActions.loadProducts),
		switchMap((action) => this.productService.getAllProducts()
			.pipe(
				map(result => productActions.loadProductsSuccess({ products : result })),
				catchError(error => of(productActions.loadProductsFailure({ error })))
			)
		)
	));
	//----------------------------------------------------------------------------------
	loadProduct$ = createEffect(() => this.actions$.pipe(
		ofType(productActions.loadProduct),
		switchMap((action) => this.productService.getProduct(action.id)
			.pipe(
				map(result => productActions.loadProductSuccess({ product : result })),
				catchError(error => of(productActions.loadProductFailure({ error })))
			)
		)
	));
	//----------------------------------------------------------------------------------
	loadProductsByName$ = createEffect(() => this.actions$.pipe(
		ofType(productActions.loadProductsByName),
		switchMap((action) => this.productService.getProductByNameList(action.name)
			.pipe(
				map(result => productActions.loadProductsByNameSuccess({ products : result })),
				catchError(error => of(productActions.loadProductsByNameFailure({ error })))
			)
		)
	));
	//----------------------------------------------------------------------------------
	createProduct$ = createEffect(() => this.actions$.pipe(
		ofType(productActions.createProduct),
		switchMap((action) => this.productService.createProduct(action.product)
			.pipe(
				map(() => productActions.createProductSuccess()),
				catchError(error => of(productActions.createProductFailure({ error })))
			)
		)
	));
	//----------------------------------------------------------------------------------
	createProductSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(productActions.createProductSuccess),
			map((action) => {
				return productActions.loadProducts();
			}),
		),
	);
	//----------------------------------------------------------------------------------
	updateProduct$ = createEffect(() => this.actions$.pipe(
		ofType(productActions.updateProduct),
		switchMap((action) => this.productService.updateProduct(action.product.id, action.product)
			.pipe(
				map(() => productActions.updateProductSuccess()),
				catchError(error => of(productActions.updateProductFailure({ error })))
			)
		)
	));
	//----------------------------------------------------------------------------------
	updateProductSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(productActions.updateProductSuccess),
			map((action) => {
				return productActions.loadProducts();
			}),
		),
	);
	//----------------------------------------------------------------------------------
	deleteProduct$ = createEffect(() => this.actions$.pipe(
		ofType(productActions.deleteProduct),
		switchMap((action) => this.productService.deleteProduct(action.id)
			.pipe(
				map(() => productActions.deleteProductSuccess()),
				catchError(error => of(productActions.deleteProductFailure({ error })))
			)
		)
	));
	//----------------------------------------------------------------------------------
	deleteProductSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(productActions.deleteProductSuccess),
			map((action) => {
				return productActions.loadProducts();
			}),
		),
	);
}
