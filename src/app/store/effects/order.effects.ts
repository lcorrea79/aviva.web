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
import * as services from 'src/app/data/services/order.service';
//--------------------------------------------------------------------------------------
// Imports Section (Actions)
//--------------------------------------------------------------------------------------
import { orderActions } 	from '../actions/order.action';



@Injectable()
export class OrderEffects {
  	//----------------------------------------------------------------------------------
	// Constructor Method Section
	//----------------------------------------------------------------------------------
  	constructor(
		private actions$: Actions,
		private orderService: services.OrderService
		) {}
    //----------------------------------------------------------------------------------
	// Effects Section
	//----------------------------------------------------------------------------------
	loadOrders$ = createEffect(() => this.actions$.pipe(
		ofType(orderActions.loadOrders),
		switchMap((action) => this.orderService.getAllOrders()
			.pipe(
				map(result => orderActions.loadOrdersSuccess({ orders : result })),
				catchError(error => of(orderActions.loadOrdersFailure({ error })))
			)
		)
	));
	//----------------------------------------------------------------------------------
	loadOrder$ = createEffect(() => this.actions$.pipe(
		ofType(orderActions.loadOrder),
		switchMap((action) => this.orderService.getOrder(action.id)
			.pipe(
				map(result => orderActions.loadOrderSuccess({ order : result })),
				catchError(error => of(orderActions.loadOrderFailure({ error })))
			)
		)
	));
	//----------------------------------------------------------------------------------
	createOrder$ = createEffect(() => this.actions$.pipe(
		ofType(orderActions.createOrder),
		switchMap((action) => this.orderService.createOrder( action.order)
			.pipe(
				map(() => orderActions.createOrderSuccess()),
				catchError(error => of(orderActions.createOrderFailure({ error })))
			)
		)
	));
	//----------------------------------------------------------------------------------
	createOrderSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(orderActions.createOrderSuccess),
			map((action) => {
				return orderActions.loadOrders();
			}),
		),
	);
	//----------------------------------------------------------------------------------
	canelOrder$ = createEffect(() => this.actions$.pipe(
		ofType(orderActions.cancelOrder),
		switchMap((action) => this.orderService.cancelOrder(action.id)
			.pipe(
				map(() => orderActions.cancelOrderSuccess()),
				catchError(error => of(orderActions.cancelOrderFailure({ error })))
			)
		)
	));
	//----------------------------------------------------------------------------------
	cancelOrderSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(orderActions.cancelOrderSuccess),
			map((action) => {
				return orderActions.loadOrders();
			}),
		),
	);
	//----------------------------------------------------------------------------------
	payOrder$ = createEffect(() => this.actions$.pipe(
		ofType(orderActions.payOrder),
		switchMap((action) => this.orderService.payOrder(action.id)
			.pipe(
				map(() => orderActions.payOrderSuccess()),
				catchError(error => of(orderActions.payOrderFailure({ error })))
			)
		)
	));
	//----------------------------------------------------------------------------------
	payOrderSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(orderActions.payOrderSuccess),
			map((action) => {
				return orderActions.loadOrders();
			}),
		),
	);
}
