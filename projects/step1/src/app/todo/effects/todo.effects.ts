import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TodoActions, TodoActionTypes, LoadTodosComplete, LoadTodos } from '../actions/todo.actions';
import { TaskService } from '../../core/services/task.service';
import { switchMap, map } from 'rxjs/operators';
import { Filter } from '../filter.model';

@Injectable()
export class TodoEffects {

  @Effect()
  tasks$ = this.actions$.ofType<LoadTodos>(TodoActionTypes.LoadTodos)
	.pipe(
		switchMap( (action) => {
			if(action.payload !== Filter.ALL) {
				return this.taskService.searchTasks(action.payload === Filter.COMPLETED);
			}
			return this.taskService.getTasks();
		} ),
		map( (tasks) => new LoadTodosComplete(tasks) )
	);

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
