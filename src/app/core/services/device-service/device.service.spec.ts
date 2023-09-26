/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { DeviceServiceImpl } from './device.service';

describe('Service: DeviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceServiceImpl]
    });
  });

  it('should ...', inject([DeviceServiceImpl], (service: DeviceServiceImpl) => {
    expect(service).toBeTruthy();
  }));
});
