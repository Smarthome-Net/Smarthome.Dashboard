import { Provider } from '@angular/core';
import { DeviceService } from './device-service';
import { DeviceServiceImpl } from './device.service';

export * from './device-service';
export const DeviceServiceProvider: Provider = { provide: DeviceService, useClass: DeviceServiceImpl }

