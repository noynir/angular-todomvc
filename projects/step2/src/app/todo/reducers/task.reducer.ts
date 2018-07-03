import { Task } from "../../core/models/task.model";
import { TaskActions, TaskActionTypes } from "../actions/task.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface State {
	tasks: Task[];
}

export const initialState: State = {
	tasks: []
};

export function reducer(state = initialState, action: TaskActions): State {
	switch (action.type) {
		case TaskActionTypes.LoadTasks:
			const tasks = action.payload.tasks;
			return { tasks };
		default:
			return state;
	}
}

export const getToDo = createFeatureSelector<State>('todo');
export const getTasks = createSelector(getToDo, (state: State) => state.tasks);
