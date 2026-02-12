import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard').then((m) => m.DashboardComponent),
    children: [
      { path: 'home', loadComponent: () => import('./features/dashboard').then(m => m.HomeComponent) },
      {
        path: 'temperature',
        children: [
          { path: 'values', loadComponent: () => import('./features/dashboard').then(m => m.TemperatureValueChartsComponent) },
          { path: 'statistics', loadComponent: () => import('./features/dashboard').then(m => m.TemperatureStatisticComponent) },
          { path: '', redirectTo: 'values', pathMatch: 'full' },
      ]},
      {
        path: 'device-setting',
        children: [
          { path: 'overview', loadComponent: () => import('./features/dashboard').then(m => m.DeviceSettingListComponent) },
          { path: ':id', loadComponent: () => import('./features/dashboard').then(m => m.DeviceSettingDetailsComponent) },
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
        ],
      }, 
      { path: 'setting', loadComponent: () => import('./features/dashboard').then(m => m.SettingComponent) },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
  ]},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
