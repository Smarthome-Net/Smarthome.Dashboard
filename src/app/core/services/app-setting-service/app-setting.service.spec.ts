/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppSettingServiceService } from './app-setting.service';

describe('Service: AppSettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppSettingServiceService]
    });
  });

  it('should ...', inject([AppSettingServiceService], (service: AppSettingServiceService) => {
    expect(service).toBeTruthy();
  }));
});
