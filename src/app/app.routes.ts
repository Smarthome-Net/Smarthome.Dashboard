import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent), children: [
    { path: 'index', loadComponent: () => import('./features/dashboard/home/home.component').then(m => m.HomeComponent) },
    { path: 'temperature', children: [
      { path: 'value', loadComponent: () => import('./features/dashboard/temperature/temperature-value-charts/temperature-value-charts.component').then(m => m.TemperatureValueChartsComponent) },
      { path: 'statistic', loadComponent: () => import('./features/dashboard/temperature/temperature-statistic/temperature-statistic.component').then(m => m.TemperatureStatisticComponent) },
      { path: '', redirectTo: 'value', pathMatch: 'full' },
    ] },
    { path: 'device-setting', loadComponent: () => import('./features/dashboard/device-setting/device-setting-list/device-setting-list.component').then(m => m.DeviceSettingListComponent) },
    { path: 'device-setting/:id', loadComponent: () => import('./features/dashboard/device-setting/device-setting-details/device-setting-details.component').then(m => m.DeviceSettingDetailsComponent) },
    { path: 'setting', loadComponent: () => import('./features/dashboard/setting/setting.component').then(m => m.SettingComponent) },
    { path: '', redirectTo: 'index', pathMatch: 'full' },
  ]},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
