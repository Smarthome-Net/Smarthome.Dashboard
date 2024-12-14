import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceSettingRoutingModule } from './device-setting-routing.module';
import { DeviceSettingListComponent } from './device-setting-list/device-setting-list.component';
import { DeviceSettingDetailsComponent } from './device-setting-details/device-setting-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DeviceSettingRoutingModule,
        DeviceSettingListComponent,
        DeviceSettingDetailsComponent
    ]
})
export class DeviceSettingModule { }
