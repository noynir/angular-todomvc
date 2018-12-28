import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoContainerComponent } from './todo-container/todo-container.component';
import { TasksComponent } from './tasks/tasks.component';
import { StoreModule } from '@ngrx/store';
import * as fromTasks from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './effects/task.effects';

@NgModule({
	imports: [ CommonModule,
		FormsModule,
		StoreModule.forFeature('tasks', fromTasks.reducers, { metaReducers: fromTasks.metaReducers }),
		EffectsModule.forFeature([TaskEffects]),
	],
	declarations: [TodoContainerComponent, TasksComponent],
	exports:[TodoContainerComponent]
})
export class TodoModule {


}


