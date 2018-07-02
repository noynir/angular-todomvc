import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoActions, TodoActionTypes } from '../actions/todo.actions';
import { TaskModel } from '../../core/models/task.model';

export interface State {
	tasks: TaskModel[];
};

export const initialState: State = {
	tasks: []
};

export function reducer(state = initialState, action: TodoActions): State {
	switch (action.type) {
		case TodoActionTypes.LoadTodosComplete:
			const tasks = action.payload;
			return {tasks};
		default:
			return state;
	}
}

export const getToDo = createFeatureSelector<State>('todo');
export const getTasks = createSelector(getToDo, (state: State) => state.tasks);
