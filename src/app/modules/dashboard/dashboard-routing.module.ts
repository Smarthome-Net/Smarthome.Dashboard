import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'temperature', loadChildren: () => import('./temperature/temperature.module').then(m => m.TemperatureModule) },
    { path: 'device-setting', loadChildren: () => import('./device-setting/device-setting.module').then(m => m.DeviceSettingModule) }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
