/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StorageManagerService } from './storage-manager.service';

describe('Service: StorageManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageManagerService]
    });
  });

  it('should ...', inject([StorageManagerService], (service: StorageManagerService) => {
    expect(service).toBeTruthy();
  }));
});
