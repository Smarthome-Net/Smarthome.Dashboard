import { Provider } from '@angular/core';
import { ChartService } from './chart-service';
import { ChartServiceImpl } from './chart.service';

export * from './chart-service';

export function provideChartService(): Provider {
    return {
        provide: ChartService, useClass: ChartServiceImpl
    }
};
