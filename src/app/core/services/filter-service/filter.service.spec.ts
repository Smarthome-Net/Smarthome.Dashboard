/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilterServiceImpl } from './filter.service';

describe('Service: Filter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterServiceImpl]
    });
  });

  it('should ...', inject([FilterServiceImpl], (service: FilterServiceImpl) => {
    expect(service).toBeTruthy();
  }));
});
