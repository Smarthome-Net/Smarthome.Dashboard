import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceSettingComponent } from './device-setting.component';
import { DeviceSettingRoutingModule } from './device-setting-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DeviceSettingRoutingModule
  ],
  declarations: [DeviceSettingComponent]
})
export class DeviceSettingModule { }
