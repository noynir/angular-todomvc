import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../reducers/todo.reducer';
import { Observable } from 'rxjs';
import { TaskModel } from '../../core/models/task.model';
import { LoadTodos } from '../actions/todo.actions';
import { Filter } from '../filter.model';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent implements OnInit {

	tasks$: Observable<TaskModel[]>;

	constructor(private store: Store<fromStore.State>) { }

	ngOnInit() {
		this.tasks$ = this.store.select(fromStore.getTasks);
		this.store.dispatch(new LoadTodos());
	}

	filterTasks(filter: Filter){
		this.store.dispatch(new LoadTodos(filter));
	}

}
