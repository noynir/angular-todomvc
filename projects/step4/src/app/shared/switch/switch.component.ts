import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit, OnChanges {

	@Input() isChecked;

	@Output() switched = new EventEmitter<boolean>();

	checked = false;
	get checkedAttr(){
		return this.checked ? 'checked' : null;
	}

	constructor() { }

	ngOnInit() {
		this.checked = !!this.isChecked;
	}

	ngOnChanges(changes: SimpleChanges){

	}



	onToggle(){
		this.checked = !this.checked;
		this.switched.emit(this.checked);
	}

}
