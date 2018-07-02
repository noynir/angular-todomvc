import { Action } from '@ngrx/store';

export enum ThemeActionTypes {
  LoadThemes = '[Theme] Load Themes'
}

export class Theme implements Action {
  readonly type = ThemeActionTypes.LoadThemes;
}

export type ThemeActions = LoadThemes;
