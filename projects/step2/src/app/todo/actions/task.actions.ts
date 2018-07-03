import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Filter } from "../filter.model";
import { Task } from "../../core/models/task.model";

export enum TaskActionTypes {
	FetchTasks="[Task] Fetch Tasks",
	LoadTasks = "[Task] Load Tasks",
}

export class FetchTasks implements Action {
	readonly type = TaskActionTypes.FetchTasks;
	constructor(public payload: Filter = Filter.ALL){}
}

export class LoadTasks implements Action {
	readonly type = TaskActionTypes.LoadTasks;

	constructor(public payload: { tasks: Task[] }) {}
}


export type TaskActions =
	| LoadTasks
	| FetchTasks;
