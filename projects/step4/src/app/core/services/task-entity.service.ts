import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from 'ngrx-data';

@Injectable({
  providedIn: 'root'
})
export class TaskEntityService extends EntityCollectionServiceBase<Task> {

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
		super('Task', serviceElementsFactory);
	  }
}
