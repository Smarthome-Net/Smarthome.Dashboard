import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatteryStatusComponent } from './battery-status.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,

    MatIconModule
  ],
  declarations: [
    BatteryStatusComponent
  ],
  exports: [
    BatteryStatusComponent
  ]
})
export class BatteryStatusModule { }
