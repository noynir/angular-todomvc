import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTodo from './reducers/todo.reducer';
import { TodoEffects } from './effects/todo.effects';
import { TodoContainerComponent } from './todo-container/todo-container.component';
import { TasksComponent } from './tasks/tasks.component';


@NgModule({
	imports: [ CommonModule,
		FormsModule,
		StoreModule.forFeature('todo', fromTodo.reducer),
		EffectsModule.forFeature([TodoEffects])
	],
	declarations: [TodoContainerComponent, TasksComponent],
	providers:[TodoService],
	exports:[TodoContainerComponent]
})
export class TodoModule {


}


