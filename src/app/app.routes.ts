import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'dashboard', loadComponent: () => import('./modules/dashboard/dashboard.component').then((m) => m.DashboardComponent), children: [
    { path: 'index', loadComponent: () => import('./modules/dashboard/home/home.component').then(m => m.HomeComponent) },
    { path: 'temperature', children: [
      { path: 'value', loadComponent: () => import('./modules/dashboard/temperature/temperature-value-charts/temperature-value-charts.component').then(m => m.TemperatureValueChartsComponent) },
      { path: 'statistic', loadComponent: () => import('./modules/dashboard/temperature/temperature-statistic/temperature-statistic.component').then(m => m.TemperatureStatisticComponent) },
      { path: '', redirectTo: 'value', pathMatch: 'full' },
    ] },
    { path: 'device-setting', loadComponent: () => import('./modules/dashboard/device-setting/device-setting-list/device-setting-list.component').then(m => m.DeviceSettingListComponent) },
    { path: 'device-setting/:id', loadComponent: () => import('./modules/dashboard/device-setting/device-setting-details/device-setting-details.component').then(m => m.DeviceSettingDetailsComponent) },
    { path: 'setting', loadComponent: () => import('./modules/dashboard/setting/setting.component').then(m => m.SettingComponent) },
    { path: '', redirectTo: 'index', pathMatch: 'full' },
  ]},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
