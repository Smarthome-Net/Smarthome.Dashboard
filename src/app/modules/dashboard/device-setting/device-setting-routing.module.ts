import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceSettingListComponent } from './device-setting-list/device-setting-list.component';
import { DeviceSettingDetailsComponent } from './device-setting-details/device-setting-details.component';


const routes: Routes = [
  { path: '', component: DeviceSettingListComponent }, 
  { path: ':id', component: DeviceSettingDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceSettingRoutingModule {}
