import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureComponent } from './temperature.component';
import { TemperatureRoutingModule } from './temperature-routing.module';
import { TemperatureStatisticComponent } from './temperature-statistic/temperature-statistic.component';
import { TemperatureValueChartsComponent } from './temperature-value-charts/temperature-value-charts.component';

@NgModule({
    imports: [
        CommonModule,
        TemperatureRoutingModule,
        TemperatureComponent,
        TemperatureStatisticComponent,
        TemperatureValueChartsComponent
    ]
})
export class TemperatureModule { }
