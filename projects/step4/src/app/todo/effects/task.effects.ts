import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { TaskActionTypes, LoadTasks, FetchTasks, UpsertTask, CreateTask, PutTask, RemoveTask, DeleteTask } from "../actions/task.actions";
import { TaskService } from "../../core/services/task.service";
import { map, switchMap } from "rxjs/operators";
import { Filter } from "../filter.model";

@Injectable()
export class TaskEffects {
	@Effect()
	tasks$ = this.actions$.ofType<FetchTasks>(TaskActionTypes.FetchTasks).pipe(
		switchMap(action => {
			if (action.payload !== Filter.ALL) {
				return this.taskService.searchTasks(
					action.payload === Filter.COMPLETED
				);
			}
			return this.taskService.getTasks();
		}),
		map(tasks => new LoadTasks({ tasks }))
	);

	@Effect()
	upsertTask$ = this.actions$
		.ofType<CreateTask | PutTask>(
			TaskActionTypes.CreateTask,
			TaskActionTypes.PutTask
		)
		.pipe(
			switchMap(action => {
				if (action.type === TaskActionTypes.CreateTask) {
					return this.taskService.addTask(action.payload.title);
				} else {
					return this.taskService.updateTask(action.payload);
				}
			}),
			map(task => new UpsertTask({ task }))
		);

	@Effect()
	removeTask$ = this.actions$
		.ofType<RemoveTask>(TaskActionTypes.RemoveTask)
			.pipe(
				switchMap(action => this.taskService.deleteTask(action.payload)),
				map(id => new DeleteTask({ id }) )
			)

	constructor(private actions$: Actions, private taskService: TaskService) {}
}