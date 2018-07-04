import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../../core/models/task.model";
import { Filter } from "../filter.model";
import { FetchTasks, CreateTask, PutTask, RemoveTask } from "../actions/task.actions";
import { TaskEntityService } from "../../core/services/task-entity.service";

@Component({
	selector: "app-todo-container",
	templateUrl: "./todo-container.component.html",
	styleUrls: ["./todo-container.component.css"]
})
export class TodoContainerComponent implements OnInit {
	tasks$: Observable<Task[]>;

	constructor(private tasksService: TaskEntityService) {
		this.tasks$ = tasksService.entities$;
	}

	ngOnInit() {
		this.tasksService.getAll();
	}

	filterTasks(filter: Filter) {
		// this.store.dispatch(new FetchTasks(filter));
	}

	submitTask(title: string) {
		const id = Math.floor(Math.random() * 100);
		this.tasksService.add(new Task(id, title, false));
		// this.store.dispatch(new CreateTask(new Task(null, title)));
	}

	removeTask(task: Task) {
		this.tasksService.delete(task.id);
		// this.store.dispatch(new RemoveTask(task.id));
	}

	toggleTask(task: Task) {
		this.tasksService.update(Object.assign({}, task, {completed: !task.completed}));
		// this.store.dispatch(new PutTask(task));
	}
}
