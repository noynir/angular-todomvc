import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Filter } from "../filter.model";
import { Task } from "../../core/models/task.model";
import { TaskService } from "../../core/services/task.service";
import { withLatestFrom, map } from "rxjs/operators";

@Component({
	selector: "app-todo-container",
	templateUrl: "./todo-container.component.html",
	styleUrls: ["./todo-container.component.css"]
})
export class TodoContainerComponent implements OnInit {
	tasks: Task[] = [];
	private currentFilter:Filter = Filter.ALL;


	constructor(private taskService: TaskService) {}

	ngOnInit() {
		this.fetchTasks(this.currentFilter);
	}

	filterTasks(filter: Filter) {
		this.currentFilter = filter;
		this.fetchTasks(filter);
	}

	fetchTasks(filter: Filter){

		if(this.currentFilter === Filter.ALL){	
			this.taskService.getTasks()
				.subscribe( (tasks) => this.tasks = tasks)
		}
		else {
			this.taskService.searchTasks(this.currentFilter === Filter.COMPLETED)
				.subscribe( (tasks) => this.tasks = tasks)
		}

	}
	submitTask(title: string) {
		this.taskService.addTask(title)
			.subscribe( (task) => this.fetchTasks(this.currentFilter) );
	}

	removeTask(task: Task) {
		this.taskService.deleteTask(task)
			.subscribe( (task) => this.fetchTasks(this.currentFilter) );
	}

	toggleTask(task: Task) {
		
		this.taskService.updateTask(task)
			.subscribe( (task) => this.fetchTasks(this.currentFilter) );
	}
}
