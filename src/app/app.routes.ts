import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'dashboard', loadComponent: () => import('./features/dashboard').then((m) => m.DashboardComponent), children: [
    { path: 'index', loadComponent: () => import('./features/dashboard').then(m => m.HomeComponent) },
    { path: 'temperature', children: [
      { path: 'value', loadComponent: () => import('./features/dashboard').then(m => m.TemperatureValueChartsComponent) },
      { path: 'statistic', loadComponent: () => import('./features/dashboard').then(m => m.TemperatureStatisticComponent) },
      { path: '', redirectTo: 'value', pathMatch: 'full' },
    ] },
    { path: 'device-setting', loadComponent: () => import('./features/dashboard').then(m => m.DeviceSettingListComponent) },
    { path: 'device-setting/:id', loadComponent: () => import('./features/dashboard').then(m => m.DeviceSettingDetailsComponent) },
    { path: 'setting', loadComponent: () => import('./features/dashboard').then(m => m.SettingComponent) },
    { path: '', redirectTo: 'index', pathMatch: 'full' },
  ]},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
