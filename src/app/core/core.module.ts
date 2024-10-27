import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceService, DeviceServiceImpl } from '@services/device-service';
import { FilterService, FilterServiceImpl } from '@services/filter-service';
import { StatisticService, StatisticServiceImpl } from '@services/statistic-service';
import { TemperatureChartHubService, TemperatureChartHubServiceImpl } from '@services/temperature-chart-hub';
import { TemperatureChartService, TemperatureChartServiceImpl } from '@services/temperature-chart-service';
import { SettingService, SettingServiceImpl } from '@services/setting-service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: StatisticService, useClass: StatisticServiceImpl },
    { provide: FilterService, useClass: FilterServiceImpl },
    { provide: TemperatureChartHubService, useClass: TemperatureChartHubServiceImpl },
    { provide: DeviceService, useClass: DeviceServiceImpl },
    { provide: TemperatureChartService, useClass: TemperatureChartServiceImpl },
    { provide: SettingService, useClass: SettingServiceImpl }
  ]
})
export class CoreModule { }
