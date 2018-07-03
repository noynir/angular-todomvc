import { Action } from '@ngrx/store';
import { TaskModel } from '../../core/models/task.model';
import { Filter } from '../filter.model';

export enum TodoActionTypes {
  LoadTodos = '[Todo] Load Todos',
  LoadTodosComplete = '[Todo] Load Todos Complete',
}

export class LoadTodos implements Action {
  readonly type = TodoActionTypes.LoadTodos;
  constructor(public payload: Filter = Filter.ALL){}
}

export class LoadTodosComplete implements Action {
	readonly type = TodoActionTypes.LoadTodosComplete;

	constructor(public payload: TaskModel[]){}
}

export type TodoActions = LoadTodos |  LoadTodosComplete;
