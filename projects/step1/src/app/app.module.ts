import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { TodoModule } from './todo/todo.module';
import { ThemeContainerComponent } from './theme-container/theme-container.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskdbService } from './core/services/taskdb.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
	declarations: [
		AppComponent,
		ThemeContainerComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		HttpClientInMemoryWebApiModule.forRoot(TaskdbService,{put204:false, delete404:false}),
		SharedModule,
		TodoModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
