import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoContainerComponent } from './todo-container/todo-container.component';
import { TasksComponent } from './tasks/tasks.component';


@NgModule({
	imports: [ CommonModule,
		FormsModule
	],
	declarations: [TodoContainerComponent, TasksComponent],
	providers: [],
	exports: [TodoContainerComponent]
})
export class TodoModule {


}


