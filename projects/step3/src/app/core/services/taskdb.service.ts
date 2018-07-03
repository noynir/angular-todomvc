import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from '../models/task.model';

export class TaskdbService implements InMemoryDbService {

	createDb() {
		const tasks = [
		  new Task(1, 'Learn Angular', true),
		  new Task(2, 'Learn ngrx', false),
		  new Task(3, 'Get milk', false),
		];
		return {tasks};
	 }
}
