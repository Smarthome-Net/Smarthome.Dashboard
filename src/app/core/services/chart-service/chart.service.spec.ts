/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChartServiceImpl } from './chart.service';

describe('Service: TemperatureChart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartServiceImpl]
    });
  });

  it('should ...', inject([ChartServiceImpl], (service: ChartServiceImpl) => {
    expect(service).toBeTruthy();
  }));
});
