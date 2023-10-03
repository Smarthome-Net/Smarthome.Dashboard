import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceSettingRoutingModule } from './device-setting-routing.module';
import { DeviceSettingListComponent } from './device-setting-list/device-setting-list.component';
import { DeviceSettingDetailsComponent } from './device-setting-details/device-setting-details.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DeviceSettingRoutingModule,

    SharedModule
  ],
  declarations: [
    DeviceSettingListComponent,
    DeviceSettingDetailsComponent
  ]
})
export class DeviceSettingModule { }
