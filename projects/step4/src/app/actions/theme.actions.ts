import { Action } from '@ngrx/store';

export enum ThemeActionTypes {
	ToggleDarkTheme = '[Theme] Toggle Dark Theme'
}

export class ToggleDarkTheme implements Action {
	readonly type = ThemeActionTypes.ToggleDarkTheme;
	constructor(public payload:boolean){}
}

export type ThemeActions = ToggleDarkTheme;
