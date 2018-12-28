import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Filter } from "../filter.model";
import { Task } from "../../core/models/task.model";
import { TaskService } from "../../core/services/task.service";
import { withLatestFrom, map, tap } from "rxjs/operators";
import * as fromTasks from '../reducers/filter.reducer';
import { getCurrentFilter, getTaskEntities } from "../reducers";
import { FilterTasks } from "../actions/filter.actions";
import { FetchTasks, CreateTask, RemoveTask, PutTask } from "../actions/task.actions";

  
@Component({
	selector: "app-todo-container",
	templateUrl: "./todo-container.component.html",
	styleUrls: ["./todo-container.component.css"]
})
export class TodoContainerComponent implements OnInit {
	tasks$: Observable<Task[]>;
	private currentFilter$: Observable<Filter>;


	constructor(
		private store: Store<fromTasks.State>) {}

	ngOnInit() {
		this.tasks$ = this.store.select(getTaskEntities);
		this.currentFilter$ = this.store.select( getCurrentFilter )
			.pipe(
				tap( (filter) => this.fetchTasks(filter))
			);
	}

	filterTasks(filter: Filter) {
		this.store.dispatch(new FilterTasks({filter}));
	}

	fetchTasks(filter: Filter){
		this.store.dispatch(new FetchTasks({ filter }));
	}
	submitTask(title: string) {
		this.store.dispatch(new CreateTask( {task:new Task(null, title)}));
	}

	removeTask(task: Task) {
		this.store.dispatch(new RemoveTask({id:task.id}));
	}

	toggleTask(task: Task) {
		this.store.dispatch(new PutTask({task}));
	}
}
