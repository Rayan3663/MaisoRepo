import { Action, createReducer, on } from '@ngrx/store';
import * as FormActions from './form.actions';

export interface AppState {
  initPrice: number; 
}

export const initialState: AppState = {
  initPrice: 0 
};
const _formReducer = createReducer(
  initialState,
  on(FormActions.setInitialPrice, (state, { initPrice }) => {
    console.log('Reducer received setInitialPrice with:', initPrice);
    return {
      ...state,
      initPrice
    };
  })
);

export function formReducer(state: AppState | undefined, action: Action) {
  return _formReducer(state, action);
}
