import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoContainerComponent } from './todo-container/todo-container.component';
import { TasksComponent } from './tasks/tasks.component';
import { StoreModule } from '@ngrx/store';
import * as fromTasks from './reducers';

@NgModule({
	imports: [ CommonModule,
		FormsModule,
		StoreModule.forFeature('tasks', fromTasks.reducers, { metaReducers: fromTasks.metaReducers }),
	],
	declarations: [TodoContainerComponent, TasksComponent],
	exports:[TodoContainerComponent]
})
export class TodoModule {


}


