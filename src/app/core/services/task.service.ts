import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/task.model';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class TaskService {


	private tasksUrl = 'api/tasks';

	constructor (private http: HttpClient) { }

	getTasks (): Observable<Task[]> {
		return this.http.get<Task[]>(this.tasksUrl).pipe(
			catchError(this.handleError)
		);
	}

	// This get-by-id will 404 when id not found
	getTask(id: number): Observable<Task> {
		const url = `${this.tasksUrl}/${id}`;
		return this.http.get<Task>(url).pipe(
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
	addTask (title: string, completed = false): Observable<Task> {
		const task = { id: this.generateId(), title, completed };

		return this.http.post<Task>(this.tasksUrl, task).pipe(
			catchError(this.handleError)
		);
	}

	deleteTask (task: Task | number): Observable<number> {
		const id = typeof task === 'number' ? task : task.id;
		const url = `${this.tasksUrl}/${id}`;

		return this.http.delete<Task>(url).pipe(
			map(() => id),
			catchError(this.handleError)
		);
	}

	searchTasks(completed: boolean = null): Observable<Task[]> {
		// add safe, encoded search parameter if term is present
		const options = completed != null ?
			{ params: new HttpParams().set('completed', completed.toString() ) } : {};

			return this.http.get<Task[]>(this.tasksUrl, options).pipe(
				catchError(this.handleError)
			);
	}

	updateTask (task: Task): Observable<Task> {
		const url = `${this.tasksUrl}`;
		return this.http.put<Task>(url, task).pipe(
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
