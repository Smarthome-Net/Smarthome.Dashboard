/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TemperatureChartServiceImpl } from './temperature-chart.service';

describe('Service: TemperatureChart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemperatureChartServiceImpl]
    });
  });

  it('should ...', inject([TemperatureChartServiceImpl], (service: TemperatureChartServiceImpl) => {
    expect(service).toBeTruthy();
  }));
});
