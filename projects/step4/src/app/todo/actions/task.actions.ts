import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Task } from "../../core/models/task.model";
import { Filter } from "../filter.model";

export enum TaskActionTypes {
	FetchTasks="[Task] Fetch Tasks",
	LoadTasks = "[Task] Load Tasks",
	CreateTask="[Task] Create Tasks",
	AddTask = "[Task] Add Task",
	UpsertTask = "[Task] Upsert Task",
	AddTasks = "[Task] Add Tasks",
	UpsertTasks = "[Task] Upsert Tasks",
	PutTask="[Task] Put Tasks",
	UpdateTask = "[Task] Update Task",
	UpdateTasks = "[Task] Update Tasks",
	RemoveTask = "[Task] Remove Task",
	DeleteTask = "[Task] Delete Task",
	DeleteTasks = "[Task] Delete Tasks",
	ClearTasks = "[Task] Clear Tasks"
}

export class FetchTasks implements Action {
	readonly type = TaskActionTypes.FetchTasks;
	constructor(public payload: Filter = Filter.ALL){}
}

export class CreateTask implements Action {
	readonly type = TaskActionTypes.CreateTask;
	constructor(public payload: Task){}
}

export class PutTask implements Action {
	readonly type = TaskActionTypes.PutTask;
	constructor(public payload: Task){}
}
export class RemoveTask implements Action {
	readonly type = TaskActionTypes.RemoveTask;
	constructor(public payload: number){}
}


export class LoadTasks implements Action {
	readonly type = TaskActionTypes.LoadTasks;

	constructor(public payload: { tasks: Task[] }) {}
}

export class AddTask implements Action {
	readonly type = TaskActionTypes.AddTask;

	constructor(public payload: { task: Task }) {}
}

export class UpsertTask implements Action {
	readonly type = TaskActionTypes.UpsertTask;

	constructor(public payload: { task: Task }) {}
}

export class AddTasks implements Action {
	readonly type = TaskActionTypes.AddTasks;

	constructor(public payload: { tasks: Task[] }) {}
}

export class UpsertTasks implements Action {
	readonly type = TaskActionTypes.UpsertTasks;

	constructor(public payload: { tasks: Task[] }) {}
}

export class UpdateTask implements Action {
	readonly type = TaskActionTypes.UpdateTask;

	constructor(public payload: { task: Update<Task> }) {}
}

export class UpdateTasks implements Action {
	readonly type = TaskActionTypes.UpdateTasks;

	constructor(public payload: { tasks: Update<Task>[] }) {}
}

export class DeleteTask implements Action {
	readonly type = TaskActionTypes.DeleteTask;

	constructor(public payload: { id: number }) {}
}

export class DeleteTasks implements Action {
	readonly type = TaskActionTypes.DeleteTasks;

	constructor(public payload: { ids: string[] }) {}
}

export class ClearTasks implements Action {
	readonly type = TaskActionTypes.ClearTasks;
}

export type TaskActions =
	| LoadTasks
	| AddTask
	| UpsertTask
	| AddTasks
	| UpsertTasks
	| UpdateTask
	| UpdateTasks
	| DeleteTask
	| DeleteTasks
	| ClearTasks
	| CreateTask
	| PutTask
	| FetchTasks
	| RemoveTask;
