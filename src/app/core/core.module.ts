import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceService, DeviceServiceImpl } from '@services/device-service';
import { FilterService } from '@services/filter-service';
import { StatisticService } from '@services/statistic-service';
import { TemperatureChartHubService } from '@services/temperature-chart-hub';
import { TemperatureChartService, TemperatureChartServiceImpl } from '@services/temperature-chart-service';

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
