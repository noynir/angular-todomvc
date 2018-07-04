import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

export interface State {

}

export const reducers: ActionReducerMap<State> = {


};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

// export const getTodoState = createFeatureSelector<State>('todo');
// export const getTask = createSelector(getTodoState, (state) => state.task );
// export const getTaskEntities = createSelector(getTask, fromTask.selectAll);

