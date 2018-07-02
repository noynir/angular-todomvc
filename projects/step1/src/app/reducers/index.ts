import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import * as fromTheme from './theme.reducer';

export interface State {
	theme: fromTheme.State;
}

export const reducers: ActionReducerMap<State> = {
	theme: fromTheme.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getTheme = createFeatureSelector<fromTheme.State>('theme');
export const getThemeIsDark = createSelector(getTheme, fromTheme.getIsDarkTheme);
