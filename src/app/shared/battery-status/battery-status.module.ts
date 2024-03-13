import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatteryStatusComponent } from './battery-status.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,

    MatIconModule,
    MatTooltipModule
  ],
  declarations: [
    BatteryStatusComponent
  ],
  exports: [
    BatteryStatusComponent
  ]
})
export class BatteryStatusModule { }
