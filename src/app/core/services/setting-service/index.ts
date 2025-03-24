import { Provider } from '@angular/core';
import { SettingService } from './setting-service';
import { SettingServiceImpl } from './setting.service';

export * from './setting-service';
export function provideSettingService(): Provider {
    return {
        provide: SettingService, useClass: SettingServiceImpl
    }
}