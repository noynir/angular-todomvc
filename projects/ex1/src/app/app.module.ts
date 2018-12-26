import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AutofocusModule} from 'angular-autofocus-fix';
import {RouterModule, Routes} from '@angular/router';

import {TodoComponent} from './todo/todo.component';
import {TodoService} from './todo.service';
import {AppComponent} from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TaskdbService } from './core/services/taskdb.service';
import { TodoModule } from './todo/todo.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';


const routes: Routes = [
	{path: '', component: TodoComponent, pathMatch: 'full'},
	{path: ':filter', component: TodoComponent}
];

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AutofocusModule,
		TodoModule,
		HttpClientModule,
		HttpClientInMemoryWebApiModule.forRoot(TaskdbService,{put204:false, delete404:false}),
		StoreModule.forRoot(reducers, { metaReducers }),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
	],
	providers: [TodoService],
	bootstrap: [AppComponent]
})
export class AppModule {}
