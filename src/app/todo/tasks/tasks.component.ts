import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { Filter } from '../filter.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

	@Input() todos: Task[] = [];

	@Output() taskSubmitted = new EventEmitter<string>();

	@Output() tasksToggleAll = new EventEmitter<boolean>();

	@Output() taskToggle = new EventEmitter<Task>();

	@Output() taskDeleted = new EventEmitter<Task>();

	@Output() taskFiltered = new EventEmitter<Filter>();


	newTodo = '';
	currentTodo: Task;
	snapshot: Task;

	filter = Filter.ALL;
	completed: number;
	remaining: number;
	allCompleted: boolean;

	constructor() {
	}

	ngOnInit() {

	}

	// ~ crud

	create(todo: string) {
		if (todo.trim().length === 0) {
			return;
		}
		this.taskSubmitted.emit(todo);
		this.newTodo = '';
	}

	edit(todo: Task) {
		this.currentTodo = todo;
		this.snapshot = Object.assign({}, todo);
	}

	cancelEdit() {
		//TodoUtils.copyProperties(this.snapshot, this.currentTodo);
		this.currentTodo = null;
		this.snapshot = null;
	}

	update(todo: Task) {
		this.currentTodo = null;
		this.snapshot = null;
		// this.todoService.update(todo);
	}

	delete(todo: Task) {
		this.taskDeleted.emit(todo);
	}

	toggle(task: Task) {
		task.completed = !task.completed;
		this.taskToggle.emit(task);
	}

	toggleAll(completed: boolean) {
		this.tasksToggleAll.emit(completed);
	}

	setFilter(filter: Filter) {
		this.filter = filter;
		this.taskFiltered.emit(filter);
	}
	clearCompleted() {
		// this.todoService.clearCompleted();
	}
}

