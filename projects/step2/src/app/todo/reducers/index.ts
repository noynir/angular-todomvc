import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTask from './task.reducer';

export interface State {

  task: fromTask.State;
}

export const reducers: ActionReducerMap<State> = {

  task: fromTask.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getTodoState = createFeatureSelector<State>('todo');
export const getTask = createSelector(getTodoState, (state) => state.task );
export const getTaskEntities = createSelector(getTask, (task)=> task.tasks);

