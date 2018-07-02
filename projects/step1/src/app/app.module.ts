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

@NgModule({
	declarations: [
		AppComponent,
		ThemeContainerComponent
	],
	imports: [
		BrowserModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		SharedModule,
		TodoModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
