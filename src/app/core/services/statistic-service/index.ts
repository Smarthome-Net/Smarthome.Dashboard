import { Provider } from '@angular/core';
import { StatisticService } from './statistic-service';
import { StatisticServiceImpl } from './statistic.service';

export * from './statistic-service';
export const StatisticServiceProvider: Provider = { provide: StatisticService, useClass: StatisticServiceImpl };
