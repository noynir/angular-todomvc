import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromList from './list.reducer';

export interface State {
  list: fromList.State;
}

export const reducers: ActionReducerMap<State> = {
  list: fromList.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getTasks = createFeatureSelector<State>('tasks');

export const getList = createSelector( 
  getTasks,
  (state) =>  state.list
)

export const getListCurrentFilter= createSelector(
  getList,
  (state) => state.currentFilter
)

