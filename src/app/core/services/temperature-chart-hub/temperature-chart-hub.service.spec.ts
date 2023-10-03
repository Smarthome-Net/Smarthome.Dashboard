/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TemperatureChartHubServiceImpl } from './temperature-chart-hub.service';

describe('Service: TemperatureChartHub', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemperatureChartHubServiceImpl]
    });
  });

  it('should ...', inject([TemperatureChartHubServiceImpl], (service: TemperatureChartHubServiceImpl) => {
    expect(service).toBeTruthy();
  }));
});
