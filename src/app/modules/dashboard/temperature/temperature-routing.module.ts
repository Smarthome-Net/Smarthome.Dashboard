import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemperatureComponent } from './temperature.component';
import { TemperatureStatisticComponent } from './temperature-statistic/temperature-statistic.component';
import { TemperatureValueChartsComponent } from './temperature-value-charts/temperature-value-charts.component';

const routes: Routes = [
  { path: '', component: TemperatureComponent, children: [
    { path: '', redirectTo: 'value', pathMatch: 'full' },
    { path: 'value', component: TemperatureValueChartsComponent },
    { path: 'statistic', component: TemperatureStatisticComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemperatureRoutingModule {}
