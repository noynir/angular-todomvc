import { Action } from '@ngrx/store';
import { Filter } from '../filter.model';

export enum FilterActionTypes {
  FilterTasks = '[Tasks] filter tasks'
}

export class FilterTasks implements Action {
  readonly type = FilterActionTypes.FilterTasks;

  constructor(public payload:{ filter:Filter }){}
}

export type FilterActions = 
  | FilterTasks;
