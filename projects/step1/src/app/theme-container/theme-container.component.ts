import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
// import * as fromStore from '../reducers/theme.reducer';
// import * as fromRoot from '../reducers/';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-theme-container',
  templateUrl: './theme-container.component.html',
  styleUrls: ['./theme-container.component.css']
})
export class ThemeContainerComponent implements OnInit {



	constructor(@Inject(DOCUMENT) private document: Document
	, /*private store: Store<fromStore.State>*/) { }

	ngOnInit() {

	}

	switchChanged(isOn: boolean) {

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
