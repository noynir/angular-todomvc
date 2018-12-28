import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Filter } from "../filter.model";
import { Task } from "../../core/models/task.model";
import { TaskService } from "../../core/services/task.service";
import { withLatestFrom, map, tap } from "rxjs/operators";
import * as fromTasks from '../reducers/list.reducer';
import { getListCurrentFilter } from "../reducers";
import { FilterTasks } from "../actions/tasks.actions";

  
@Component({
	selector: "app-todo-container",
	templateUrl: "./todo-container.component.html",
	styleUrls: ["./todo-container.component.css"]
})
export class TodoContainerComponent implements OnInit {
	tasks: Task[] = [];
	private currentFilter$: Observable<Filter>;


	constructor(
		private store: Store<fromTasks.State>,
		private taskService: TaskService) {}

	ngOnInit() {

		this.currentFilter$ = this.store.select( getListCurrentFilter )
			.pipe(
				tap( (filter) => this.fetchTasks(filter))
			);
		
		
		
	}

	filterTasks(filter: Filter) {
		this.store.dispatch(new FilterTasks({filter}));
	}

	fetchTasks(filter: Filter){

		if(filter === Filter.ALL){	
			this.taskService.getTasks()
				.subscribe( (tasks) => this.tasks = tasks)
		}
		else {
			this.taskService.searchTasks(filter === Filter.COMPLETED)
				.subscribe( (tasks) => this.tasks = tasks)
		}

	}
	submitTask(title: string) {
		this.taskService.addTask(title)
			.pipe(
				withLatestFrom(this.currentFilter$)
			)
			.subscribe( ([task,filter]) => this.fetchTasks(filter) );
	}

	removeTask(task: Task) {
		this.taskService.deleteTask(task)
			.pipe(
				withLatestFrom(this.currentFilter$)
			)
			.subscribe( ([task, filter]) => this.fetchTasks(filter) );
	}

	toggleTask(task: Task) {
		
		this.taskService.updateTask(task)
			.pipe(
				withLatestFrom(this.currentFilter$)
			)
			.subscribe( ( [task,filter] ) => this.fetchTasks(filter) );
	}
}
