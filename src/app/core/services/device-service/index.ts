import { DeviceService } from './device-service';
import { DeviceServiceImpl } from './device.service';

export * from './device-service';
export const DeviceServiceProvider = { provide: DeviceService, useClass: DeviceServiceImpl }

