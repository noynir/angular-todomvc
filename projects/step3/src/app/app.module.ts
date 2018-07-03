import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { TodoModule } from './todo/todo.module';
import { ThemeContainerComponent } from './theme-container/theme-container.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskdbService } from './core/services/taskdb.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
	declarations: [
		AppComponent,
		ThemeContainerComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		HttpClientInMemoryWebApiModule.forRoot(TaskdbService,{put204:false, delete404:false}),
		EffectsModule.forRoot([]),
		StoreModule.forRoot(reducers, { metaReducers }),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		SharedModule,
		TodoModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
