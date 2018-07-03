import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from './switch/switch.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SwitchComponent],
  exports:[SwitchComponent]
})
export class SharedModule { }
