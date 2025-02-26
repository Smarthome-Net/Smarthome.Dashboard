import { Provider } from '@angular/core';
import { ChartService } from './chart-service';
import { ChartServiceImpl } from './chart.service';

export * from './chart-service';
export const ChartServiceProvider: Provider =  { provide: ChartService, useClass: ChartServiceImpl };
