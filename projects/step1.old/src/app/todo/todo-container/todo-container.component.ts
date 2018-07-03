import { Component, OnInit } from '@angular/core';
import { Filter } from '../filter.model';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent implements OnInit {


	constructor() { }

	ngOnInit() {}

	filterTasks(filter: Filter){

	}

}
