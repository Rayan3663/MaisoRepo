import { createAction, props } from '@ngrx/store';

export const setInitialPrice = createAction(
  'Set Initial Price',
  props<{ initPrice: number }>()
);
