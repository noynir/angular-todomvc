# Angular TodoMVC with ngrx - Step by Step tutorial

In this lab you will refactor a simole TodoMVC angular to use the ngrx platform for state managment.
- this repo containes a number of projects.
  - the main project you are refactoring is under the `src` folder.
  - solution for both exercises are under ther `projects` folder.
  - if you would like to run either one of the solutions you can do so with the following command in your terminal.
  ```bash
  //exercise 1
  npm run start:ex1 
  
  //exercise 2
  npm run start:ex2
  ``` 

> ### Note:
>This lab **already contains all the neccesary ngrx dependencies** but when starting a clean project you should follow these steps
>- [Create a new angular project](https://angular.io/guide/quickstart#step-1-install-the-angular-cli) 
>- [Setup ngrx Schematics and ngrx dependencies](https://next.ngrx.io/guide/schematics)

## Lab Setup

- Clone or dowload this repo.
- In your terminal `cd` into your local repo folder.
- install dependencies
  ```bash
  npm install
  ```  
- run the project
  ```bash
  npm start.
  ```



## Exercise 1 - Setup The Store
In this exercise we will setup our store create our first actions and reducers, and connect our container component to listen for state changes. 

### Step 1 - Create and define Actions

- Create an action file for Tasks related actions.
```bash
ng g action todo/Filter --group
```
- Go to the file created `todo/actions/filter.actions.ts`.
  - Create a new Action for handling the state transitions of the currentFilter that filters the list.
  - Add a new action type to `FilterActionTypes` enum and remove the exsiting one.
  ```typescript
  export enum FilterActionTypes {
    FilterTasks = '[Tasks] filter tasks'
  }
  ```
  - Create a new `FilterTasks` action class to define the Action and it's payload.
  ```typescript
  export class FilterTasks implements Action {
    readonly type = FilterActionTypes.FilterTasks;
    constructor(public payload:{ filter:Filter }){}
  }
  ```
  - Add the FilterTasks class to `TasksActions` union type
  ```typescript
  export type FilterActions =  FilterTasks;
  ```
  
### Step 2 - Create the state

- create the root state with the Cli
``` bash
ng g store State --root --module app.module.ts 
```
- Create the tasks feature state
```bash
ng g store todo/Tasks -m todo.module.ts
```

### Step 3 - Add reducers and define state

- Create the tasks list reducer of the feature state
```bash
ng generate reducer todo/Filter --reducers reducers/index.ts --group 
```
- Inside the file created `todo/reducers/filter.reducer.ts`
  - Add the currentFilter property to the State interface, this props will hold the current filter the task list is filtered by.
  ```typescript
  export interface State {
        currentFilter: Filter
  }
  ```
  -  Add the intial value of the currentFilter to initial state object. 
  ```typescript
  export const initialState: State = {
    currentFilter: Filter.ALL
  };
  ```
  - Inside the reducer function add a case to the switch to handle the chages of the currentFilter state when the `FilterTasks` action is dispatched
  ```typescript
  export function reducer(state = initialState, action: FilterActions): State {
    switch (action.type) {
        case FilterActionTypes.FilterTasks:
        return { ...state, currentFilter: action.payload.filter };
        default:
        return state;
    }
  }
  ```
### Step 4 - Create Selectors
- Inside `todo/reducers/index.ts` create selectors for the selecting the Tasks current filter
    - create a feature selector
    ```typescript
    export const getTasks = createFeatureSelector<State>('tasks');
    ```
    - create a selector for the list state
    ```typescript
    export const getFilter = createSelector( 
      getTasks,
      (state) =>  state.filter
    )
    ```
    - create a selector for the currentFilter 
    ```typescript
    export const getCurrentFilter= createSelector(
      getFilter,
      (state) => state.currentFilter
    )
    ```
  
### Step 5 - Connect the container component
- Inside the `todo/todo-container/todo-container.component.ts` add the Store service to the component.
```typescript
constructor(
		private store: Store<fromTasks.State>,
		private taskService: TaskService) {}
```
-  Update the `currentFilter` to be an `observable<Filter>` and add the $ suffix to it's name.
```typescript
private currentFilter$: Observable<Filter>;
```
-  Inside the `ngOnInit` method set the new `currentFilter$` observable to select the currentFilter from the state via the store service.
-  Add the `tap` operator for the observable, so that on every filter change new tasks will be fetched. 
```typescript
this.currentFilter$ = this.store.select( getCurrentFilter )
			.pipe(
				tap( (filter) => this.fetchTasks(filter))
			);
```
- In the `submitTask`, `removeTask` and `toggleTask` methods, pipe the `withLatestFrom` operator to get the latest filter value from the `currentFilter$` observable.
  ```typescript
  submitTask(title: string) {
		this.taskService.addTask(title)
			.pipe(
				withLatestFrom(this.currentFilter$)
			)
			.subscribe( ([task,filter]) => this.fetchTasks(filter) );
	}

	removeTask(task: Task) {
		this.taskService.deleteTask(task)
			.pipe(
				withLatestFrom(this.currentFilter$)
			)
			.subscribe( ([task, filter]) => this.fetchTasks(filter) );
	}

	toggleTask(task: Task) {
		
		this.taskService.updateTask(task)
			.pipe(
				withLatestFrom(this.currentFilter$)
			)
			.subscribe( ( [task,filter] ) => this.fetchTasks(filter) );
	}
  ```
- update the `filterTasks` method to dispatch the `FilterTasks` action.
  ```typescript
  filterTasks(filter: Filter) {
		this.store.dispatch(new FilterTasks({filter}));
	}
  ```

## Exercise 2 - Effects & Entity

### step 1 - Create and define Entity & Actions

- Create the task entity reducer and actions using the cli
```bash
ng g entity todo/Task --reducers reducers/index.ts --group true
```
This will setup entity actions and reducer.

- Because all actions realted to the Task entity are also async we will need to setup effects and some additional actions
- in the `todo/actions/task.actions.ts` file add to the `TaskActionTypes` enum actions types for fetching, creating, updating, and removing tasks.
```typescript
export enum TaskActionTypes {
  ...
  FetchTasks="[Task] Fetch Tasks",
  CreateTask="[Task] Create Tasks",
  PutTask="[Task] Put Tasks",
  RemoveTask = "[Task] Remove Task"
  
}
```
- Add action classes for every type
```typescript
export class FetchTasks implements Action {
	readonly type = TaskActionTypes.FetchTasks;
	constructor(public payload: {filter:Filter}){}
}

export class CreateTask implements Action {
	readonly type = TaskActionTypes.CreateTask;
	constructor(public payload: {task:Task}){}
}

export class PutTask implements Action {
	readonly type = TaskActionTypes.PutTask;
	constructor(public payload: {task:Task}){}
}
export class RemoveTask implements Action {
	readonly type = TaskActionTypes.RemoveTask;
	constructor(public payload: {id:number}){}
}
```
- Inside `todo/reducers/index.ts` create selectors for selecting the Tasks, by using the `selectAll` selector from the entity adapter.
```typescript

export const getTask = createSelector( getTasks, (state) =>  state.task );
export const getTaskEntities = createSelector(getTask, fromTask.selectAll);

``` 

### step2 - Create Effects

- create an Effects service for the tasks actions
```bash
ng g effect todo/Task -m todo/todo.module.ts --group true
```
- Inject to the consturctor the `TaskService`;
```typescript
 constructor(private actions$: Actions, private taskService: TaskService) {}
```
- create an Effect for fetching task that should listen to the `FetchTasks` action and after fetching the tasks should dispatch a `LoadTasks` action.
```typescript
 @Effect()
	tasks$ = this.actions$.ofType<FetchTasks>(TaskActionTypes.FetchTasks).pipe(
		switchMap(action => {
			if (action.payload.filter !== Filter.ALL) {
				return this.taskService.searchTasks(
					action.payload.filter === Filter.COMPLETED
				);
			}
			return this.taskService.getTasks();
		}),
		map(tasks => new LoadTasks({ tasks }))
	);
```
- Create an effect for upserting tasks that will listen to the `CreateTask` and `PutTask`. at the end the effect should dispatch the `UpsertTask` action.
  ```typescript
  @Effect()
	upsertTask$ = this.actions$
		.ofType<CreateTask | PutTask>(
			TaskActionTypes.CreateTask,
			TaskActionTypes.PutTask
		)
		.pipe(
			switchMap(action => {
				if (action.type === TaskActionTypes.CreateTask) {
					return this.taskService.addTask(action.payload.task.title);
				} else {
					return this.taskService.updateTask(action.payload.task);
				}
			}),
			map(task => new UpsertTask({ task }))
		);
  ```
- Create an effect for removing tasks the will listen to the `RemoveTask` action and at the end should dispatch a `DeleteTask` action.
  ```typescript
  @Effect()
	removeTask$ = this.actions$
		.ofType<RemoveTask>(TaskActionTypes.RemoveTask)
			.pipe(
				switchMap(action => this.taskService.deleteTask(action.payload.id)),
				map(id => new DeleteTask({ id: id.toString()  }) )
			)
  ```
- In the `src/App.module.ts` and to the imports an `EffectsModule.forRoot` import.
```typescript
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
```
### Step 3 - Connect the Component
- Inside the `todo/todo-container/todo-container.component.ts` add the Store service to the component.
- Update the `fetchTasks` method to only dispatch a `fetchTasks` action
  ```typescript
  this.store.dispatch(new FetchTasks({ filter }));
  ``` 
- Update the `submitTask`, `removeTask` and `toggleTask` method to only dispatch actions.
```typescript
	fetchTasks(filter: Filter){
		this.store.dispatch(new FetchTasks({ filter }));
	}
	submitTask(title: string) {
		this.store.dispatch(new CreateTask( {task:new Task(null, title)}));
	}

	removeTask(task: Task) {
		this.store.dispatch(new RemoveTask({id:task.id}));
	}

	toggleTask(task: Task) {
		this.store.dispatch(new PutTask({task}));
	}
```
- Change to `tasks` property to an Observable of `Task[]`
  ```typescript
  tasks$: Observable<Task[]>;
  ```
- Inside the `ngOnInit` initialize it by selecting it from the state
```typescript
	ngOnInit() {
		this.tasks$ = this.store.select(getTaskEntities);
		this.currentFilter$ = this.store.select( getCurrentFilter )
			.pipe(
				tap( (filter) => this.fetchTasks(filter))
			);
	}
```
-  Inside the `todo/todo-container/todo-container.component.html` update the tasks binding
```html
<app-tasks
	[todos]="tasks$ | async"
	[filter]="currentFilter$ | async"
	(taskFiltered)="filterTasks($event)"
	(taskSubmitted)="submitTask($event)"
	(taskToggle)="toggleTask($event)"
	(taskDeleted)="removeTask($event)"
>
</app-tasks>
``` 
