import { createReducer, on } from '@ngrx/store';
import { add, deleteCity } from './city.actions';
 
export const initialState = [
  {
    city: 'Ho Chi Minh',
    code: 'HCM',
    checked: false,
    expand: false,
  },
  {
    city: 'Ha Noi',
    code: 'HN',
    checked: false,
    expand: false,
  },
];
 
const _cityReducer = createReducer(
  initialState,

  on(add, (state, { city, code}) => {
      const checked= false;
      const expand = false;
    return [...state, {city, code, checked, expand}];
  }),
  on(deleteCity, (state, { city}) => {
    const newState = state.filter(o => o.city !== city)
    console.log(newState, city);
  return newState;
})
//   on(decrement, (state) => state - 1),
//   on(reset, (state) => 0)
);
 
export function cityReducer(state, action) {
  return _cityReducer(state, action);
}