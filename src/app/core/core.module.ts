import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticService, FilterService, DeviceService, DeviceServiceImpl } from './services';
import { TemperatureChartService, TemperatureChartServiceImpl } from './services/temperature-chart-service';
import { TemperatureChartHubService } from './services/temperature-chart-hub/temperature-chart-hub.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    StatisticService,
    FilterService,
    TemperatureChartHubService,
    { provide: DeviceService, useClass: DeviceServiceImpl },
    { provide: TemperatureChartService, useClass: TemperatureChartServiceImpl }
  ]
})
export class CoreModule { }
