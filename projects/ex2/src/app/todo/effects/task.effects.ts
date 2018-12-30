import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FetchTasks, TaskActionTypes, LoadTasks, CreateTask, PutTask, UpsertTask, RemoveTask, DeleteTask } from '../actions/task.actions';
import { switchMap, map } from 'rxjs/operators';
import { Filter } from '../filter.model';
import { TaskService } from '../../core/services/task.service';


@Injectable()
export class TaskEffects {

 constructor(private actions$: Actions, private taskService: TaskService) {}

 @Effect()
	tasks$ = this.actions$.pipe(
		ofType<FetchTasks>(TaskActionTypes.FetchTasks),	
		switchMap(action => {
			if (action.payload.filter !== Filter.ALL) {
				return this.taskService.searchTasks(
					action.payload.filter === Filter.COMPLETED
				);
			}
			return this.taskService.getTasks();
		}),
		map(tasks => new LoadTasks({ tasks }))
	);
	

	@Effect()
	upsertTask$ = this.actions$
		.pipe(
			ofType<CreateTask | PutTask>(
				TaskActionTypes.CreateTask,
				TaskActionTypes.PutTask
			),
			switchMap(action => {
				if (action.type === TaskActionTypes.CreateTask) {
					return this.taskService.addTask(action.payload.task.title);
				} else {
					return this.taskService.updateTask(action.payload.task);
				}
			}),
			map(task => new UpsertTask({ task }))
		);

	@Effect()
	removeTask$ = this.actions$
			.pipe(
				ofType<RemoveTask>(TaskActionTypes.RemoveTask),
				switchMap(action => this.taskService.deleteTask(action.payload.id)),
				map(id => new DeleteTask({ id: id.toString()  }) )
			)
}
