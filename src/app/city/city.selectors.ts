import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "../app.state";
 
// export const selectCityList = createSelector(
//   (state: AppState) => state.cityList,
//   (cityList: Array<any>) => cityList
// );
 

export const selectCityList = createFeatureSelector<
  AppState
>("cityList");