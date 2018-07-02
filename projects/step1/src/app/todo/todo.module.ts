import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TodoComponent } from './todo.component';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';

@NgModule({
	imports: [ CommonModule, FormsModule ],
	declarations: [TodoComponent],
	providers:[TodoService],
	exports:[TodoComponent]
})
export class TodoModule {


}
