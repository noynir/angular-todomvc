# LAB Angular TodoMVC with ngrx

In this lab you will refactor a simole TodoMVC angular to use the ngrx platform for state managment.

> ### Note:
>This lab **already contains all the neccesary ngrx dependencies** but when starting a clean project you should follow these steps
>- [Create a new angular project](https://angular.io/guide/quickstart#step-1-install-the-angular-cli) 
>- [Setup ngrx Schematics and ngrx dependencies](https://next.ngrx.io/guide/schematics)

## Exercise 1 - Setup The Store
In this exercise we will setup our store create our first actions and reducers, and connect our container component to listen for state changes. 

### Step 1 - Create and define Actions

- Create an action file for Tasks related actions.
```bash
ng g action todo/Task --group
```
- Go to the file created `todo/actions/tasks.actions.ts`.
  - Create a new Action for handling the state transitions of the currentFilter that filters the list.
  - Add a new action type to `TasksActionTypes` enum
  ```typescript
  export enum TasksActionTypes {
    LoadTasks = '[Tasks] Load Tasks',
    FilterTasks = '[Tasks] filter tasks'
  }
  ```
  - Create a new `FilterTasks` action class to define the Action and it's payload.
  ```typescript
  export class FilterTasks implements Action {
    readonly type = TasksActionTypes.FilterTasks;
    constructor(public payload:{ filter:Filter }){}
  }
  ```
  - Add the FilterTasks class to `TasksActions` union type
  ```typescript
  export type TasksActions = 
  LoadTasks
  | FilterTasks;
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
ng generate reducer todo/List --reducers reducers/index.ts --group 
```
- Inside the file created `todo/reducers/list.reducer.ts`
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
  export function reducer(state = initialState, action: fromTasks.TasksActions): State {
    switch (action.type) {
        case fromTasks.TasksActionTypes.FilterTasks:
        return { ...state, currentFilter: action.payload.filter };
        default:
        return state;
    }
  }
  ```
  ### Step 4 - connect the component

  


TodoMVC implementation based on [Angular](https://angular.io) version 6 and [ngrx](https://github.com/ngrx/platform) . 

## Development

* Run `npm install` first.
* Run `npm run start:step3` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


