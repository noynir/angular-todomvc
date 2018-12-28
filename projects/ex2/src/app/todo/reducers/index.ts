import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromList from './filter.reducer';
import * as fromTask from './task.reducer';

export interface State {
  filter: fromList.State;
  task: fromTask.State;
}

export const reducers: ActionReducerMap<State> = {
  filter: fromList.reducer,
  task: fromTask.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getTasks = createFeatureSelector<State>('tasks');

export const getFilter = createSelector( 
  getTasks,
  (state) =>  state.filter
)

export const getCurrentFilter= createSelector(
  getFilter,
  (state) => state.currentFilter
)


export const getTask = createSelector( getTasks, (state) =>  state.task );
export const getTaskEntities = createSelector(getTask, fromTask.selectAll);
