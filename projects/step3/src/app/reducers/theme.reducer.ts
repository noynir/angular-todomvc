import { Action } from '@ngrx/store';
import { ThemeActions, ThemeActionTypes } from '../actions/theme.actions';


export interface State {

	isDarkTheme: boolean;

}

export const initialState: State = {
	isDarkTheme: false
};

export function reducer(state = initialState, action: ThemeActions): State {
	switch (action.type) {
		case ThemeActionTypes.ToggleDarkTheme:
			return Object.assign({}, state, { isDarkTheme: action.payload });

		default:
			return state;
	}
}

export const getIsDarkTheme = (state:State) => state.isDarkTheme;


