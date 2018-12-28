import { Action } from '@ngrx/store';
import { Task } from '../../core/models/task.model';
import { Filter } from '../filter.model';
import * as fromTasks from '../actions/filter.actions'


export interface State {
    currentFilter: Filter
}

export const initialState: State = {
  currentFilter: Filter.ALL
};

export function reducer(state = initialState, action: fromTasks.FilterActions): State {
  switch (action.type) {
    case fromTasks.FilterActionTypes.FilterTasks:
      return { ...state, currentFilter: action.payload.filter };
    default:
      return state;
  }
}


