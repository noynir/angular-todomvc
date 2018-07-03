import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TodoContainerComponent } from './todo-container/todo-container.component';
import { TasksComponent } from './tasks/tasks.component';
import * as fromTodo from './reducers';
import { TaskEffects } from './effects/task.effects';

@NgModule({
	imports: [ CommonModule,
		FormsModule,
		EffectsModule.forFeature([TaskEffects]),
		StoreModule.forFeature('todo', fromTodo.reducers, { metaReducers: fromTodo.metaReducers })
	],
	declarations: [TodoContainerComponent, TasksComponent],
	exports:[TodoContainerComponent]
})
export class TodoModule {


}


