import { createAction, props } from '@ngrx/store';

export const add = createAction(
  '[City Component] Add new city',
  props<{ city; code; checked; expand }>()
);
export const deleteCity = createAction(
  '[City Component] delete',
  props<{ city }>()
);
