import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TaskModel } from '../models/task.model';

export class TaskdbService implements InMemoryDbService {

	createDb() {
		const tasks = [
		  new TaskModel(1, 'Learn Angular', true),
		  new TaskModel(2, 'Learn ngrx', false),
		  new TaskModel(3, 'Get milk', false),
		];
		return {tasks};
	 }
}
