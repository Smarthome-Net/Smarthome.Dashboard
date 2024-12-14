import { TemperatureChartHubService } from './temperature-chart-hub-service';
import { TemperatureChartHubServiceImpl } from './temperature-chart-hub.service';

export * from './temperature-chart-hub-service';
export const TemperatureChartHubServiceProvider = { provide: TemperatureChartHubService, useClass: TemperatureChartHubServiceImpl };
