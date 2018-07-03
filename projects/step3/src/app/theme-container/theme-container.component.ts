import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../reducers/theme.reducer';
import * as fromRoot from '../reducers/';
import { ToggleDarkTheme } from '../actions/theme.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-theme-container',
  templateUrl: './theme-container.component.html',
  styleUrls: ['./theme-container.component.css']
})
export class ThemeContainerComponent implements OnInit {

	isDarkMode$:Observable<boolean>;

	constructor(private store: Store<fromStore.State>,
		 @Inject(DOCUMENT) private document: Document) { }

	ngOnInit() {
		this.isDarkMode$ = this.store.select(fromRoot.getThemeIsDark)
			.pipe(tap((isDark) => this.changeTheme(isDark)));
	}

	switchChanged(isOn: boolean) {
		this.store.dispatch(new ToggleDarkTheme(isOn));
	}

	changeTheme(isDark: boolean){

		if(isDark){
			this.document.body.classList.add('dark');
		}
		else{
			this.document.body.classList.remove('dark');
		}

	}
}
