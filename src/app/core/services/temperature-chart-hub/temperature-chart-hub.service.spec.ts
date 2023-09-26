/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TemperatureChartHubService } from './temperature-chart-hub.service';

describe('Service: TemperatureChartHub', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemperatureChartHubService]
    });
  });

  it('should ...', inject([TemperatureChartHubService], (service: TemperatureChartHubService) => {
    expect(service).toBeTruthy();
  }));
});
