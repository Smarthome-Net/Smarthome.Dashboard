import { Provider } from '@angular/core';
import { TemperatureChartService } from './temperature-chart-service';
import { TemperatureChartServiceImpl } from './temperature-chart.service';

export * from './temperature-chart-service';
export const TemperatureChartServiceProider: Provider =  { provide: TemperatureChartService, useClass: TemperatureChartServiceImpl };
