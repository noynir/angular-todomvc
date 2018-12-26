import { Action } from '@ngrx/store';
import { Filter } from '../filter.model';

export enum TasksActionTypes {
  LoadTasks = '[Tasks] Load Tasks',
  FilterTasks = '[Tasks] filter tasks'
}

export class LoadTasks implements Action {
  readonly type = TasksActionTypes.LoadTasks;
}

export class FilterTasks implements Action {
  readonly type = TasksActionTypes.FilterTasks;

  constructor(public payload:{ filter:Filter }){}
}

export type TasksActions = 
  LoadTasks
  | FilterTasks;
