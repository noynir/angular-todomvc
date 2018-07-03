import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Filter } from "../filter.model";
import { Task } from "../../core/models/task.model";

@Component({
	selector: "app-todo-container",
	templateUrl: "./todo-container.component.html",
	styleUrls: ["./todo-container.component.css"]
})
export class TodoContainerComponent implements OnInit {
	tasks$: Observable<Task[]>;

	constructor() {}

	ngOnInit() {

	}

	filterTasks(filter: Filter) {
	}

	submitTask(title: string) {
	}

	removeTask(task: Task) {

	}

	toggleTask(task: Task) {
	}
}
