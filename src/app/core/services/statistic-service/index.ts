import { StatisticService } from './statistic-service';
import { StatisticServiceImpl } from './statistic.service';

export * from './statistic-service';
export const StatisticServiceProvider = { provide: StatisticService, useClass: StatisticServiceImpl };
