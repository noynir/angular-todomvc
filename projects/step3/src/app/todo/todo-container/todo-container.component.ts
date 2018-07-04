import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../reducers/";
import { Observable } from "rxjs";
import { Task } from "../../core/models/task.model";
import { Filter } from "../filter.model";
// import { FetchTasks, CreateTask, PutTask, RemoveTask } from "../actions/task.actions";

@Component({
	selector: "app-todo-container",
	templateUrl: "./todo-container.component.html",
	styleUrls: ["./todo-container.component.css"]
})
export class TodoContainerComponent implements OnInit {
	tasks$: Observable<Task[]>;

	constructor(private store: Store<fromStore.State>) {}

	ngOnInit() {
		// this.tasks$ = this.store.select(fromStore.getTaskEntities);
		// this.store.dispatch(new FetchTasks());
	}

	filterTasks(filter: Filter) {
		// this.store.dispatch(new FetchTasks(filter));
	}

	submitTask(title: string) {
		// this.store.dispatch(new CreateTask(new Task(null, title)));
	}

	removeTask(task: Task) {

		// this.store.dispatch(new RemoveTask(task.id));
	}

	toggleTask(task: Task) {
		// this.store.dispatch(new PutTask(task));
	}
}
