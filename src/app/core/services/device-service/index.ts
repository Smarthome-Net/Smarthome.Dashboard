import { Provider } from '@angular/core';
import { DeviceService } from './device-service';
import { DeviceServiceImpl } from './device.service';

export * from './device-service';
export function provideDeviceService(): Provider {
    return {
        provide: DeviceService, useClass: DeviceServiceImpl
    }
}

