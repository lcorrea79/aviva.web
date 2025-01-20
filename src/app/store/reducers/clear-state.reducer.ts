import {
  ActionReducer
} from '@ngrx/store';
//-------------------------------------------------------------------------------------
// Imports State
//-------------------------------------------------------------------------------------
import { AppState } from '../state/app.state';
//-------------------------------------------------------------------------------------
export const clearStateMetaReducer = (
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> => {
  return (state, action) => {
    const nextState = reducer(state, action);
    localStorage.setItem("state", JSON.stringify(nextState));

    return nextState;
  };
};
