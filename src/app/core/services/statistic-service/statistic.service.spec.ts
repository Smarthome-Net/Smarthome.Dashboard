/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StatisticServiceImpl } from './statistic.service';

describe('Service: Statistic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatisticServiceImpl]
    });
  });

  it('should ...', inject([StatisticServiceImpl], (service: StatisticServiceImpl) => {
    expect(service).toBeTruthy();
  }));
});
