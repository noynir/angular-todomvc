import { Action } from '@ngrx/store';
import { Task } from '../../core/models/task.model';
import { Filter } from '../filter.model';
import * as fromTasks from '../actions/tasks.actions'


export interface State {
    currentFilter: Filter
}

export const initialState: State = {
  currentFilter: Filter.ALL
};

export function reducer(state = initialState, action: fromTasks.TasksActions): State {
  switch (action.type) {
    case fromTasks.TasksActionTypes.FilterTasks:
      return { ...state, currentFilter: action.payload.filter };
    default:
      return state;
  }
}


