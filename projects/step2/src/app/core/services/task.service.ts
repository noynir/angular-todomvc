import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TaskModel } from '../models/task.model';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class TaskService {


	private tasksUrl = 'api/tasks';

	constructor (private http: HttpClient) { }

	getTasks (): Observable<TaskModel[]> {
		return this.http.get<TaskModel[]>(this.tasksUrl).pipe(
			catchError(this.handleError)
		);
	}

	// This get-by-id will 404 when id not found
	getTask(id: number): Observable<TaskModel> {
		const url = `${this.tasksUrl}/${id}`;
		return this.http.get<TaskModel>(url).pipe(
			catchError(this.handleError)
		);
	}

	// This get-by-id does not 404; returns undefined when id not found
	// getHero<Data>(id: number): Observable<Hero> {
	//   const url = `${this._heroesUrl}/?id=${id}`;
	//   return this.http.get<Hero[]>(url)
	//     .map(heroes => heroes[0] as Hero)
	//     .catch(this.handleError);
	// }
	addTask (title: string, completed = false): Observable<TaskModel> {
		const task = { id: this.generateId(), title, completed };

		return this.http.post<TaskModel>(this.tasksUrl, task).pipe(
			catchError(this.handleError)
		);
	}

	deleteTask (task: TaskModel | number): Observable<TaskModel> {
		const id = typeof task === 'number' ? task : task.id;
		const url = `${this.tasksUrl}/${id}`;

		return this.http.delete<TaskModel>(url).pipe(
			catchError(this.handleError)
		);
	}

	searchTasks(completed: boolean = null): Observable<TaskModel[]> {
		// add safe, encoded search parameter if term is present
		const options = completed != null ?
			{ params: new HttpParams().set('completed', completed.toString() ) } : {};

			return this.http.get<TaskModel[]>(this.tasksUrl, options).pipe(
				catchError(this.handleError)
			);
	}

	updateHero (task: TaskModel): Observable<null | TaskModel> {
		return this.http.put<TaskModel>(this.tasksUrl, task).pipe(
			catchError(this.handleError)
		);
	}

	private handleError (error: any) {
		// In a real world app, we might send the error to remote logging infrastructure
		// and reformat for user consumption
		console.error(error); // log to console instead
		return throwError(error);
	}

	private generateId = () => Math.floor(Math.random() * 100);
}
