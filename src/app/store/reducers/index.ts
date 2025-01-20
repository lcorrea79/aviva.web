//-------------------------------------------------------------------------------------
// Imports Section:
//-------------------------------------------------------------------------------------
import { Action, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { InjectionToken } from '@angular/core';
//-------------------------------------------------------------------------------------
// Imports State
//-------------------------------------------------------------------------------------
import { AppState } from '../state/app.state';
//-------------------------------------------------------------------------------------
// Imports Reducers
//-------------------------------------------------------------------------------------
import { hydrationMetaReducer } from './hydration.reducer';
import { clearStateMetaReducer } from './clear-state.reducer';
import { productReducer } from './product.reducer';
import { orderReducer } from './order.reducer';
//-------------------------------------------------------------------------------------
// Exports Section:
//-------------------------------------------------------------------------------------
export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState, Action>>('Root reducers token', {
  factory: () => ({    
    product: productReducer,
    order: orderReducer
  })
});
//-------------------------------------------------------------------------------------
export const metaReducers: MetaReducer[] = [hydrationMetaReducer, clearStateMetaReducer];
