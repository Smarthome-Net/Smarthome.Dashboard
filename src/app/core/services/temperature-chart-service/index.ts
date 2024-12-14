import { TemperatureChartService } from './temperature-chart-service';
import { TemperatureChartServiceImpl } from './temperature-chart.service';

export * from './temperature-chart-service';
export const TemperatureChartServiceProider =  { provide: TemperatureChartService, useClass: TemperatureChartServiceImpl };
