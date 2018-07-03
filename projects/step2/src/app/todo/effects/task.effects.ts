import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { TaskActionTypes, LoadTasks, FetchTasks } from "../actions/task.actions";
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
	constructor(private actions$: Actions, private taskService: TaskService) {}
}
