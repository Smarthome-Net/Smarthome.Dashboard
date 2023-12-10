import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceFilterComponent } from './device-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,

    MatFormFieldModule,
    MatSelectModule,
  ],
  declarations: [
    DeviceFilterComponent
  ],
  exports: [
    DeviceFilterComponent,
  ]
})
export class DeviceFilterModule { }
