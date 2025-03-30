import { Provider } from '@angular/core';
import { AppSettingService } from './app-setting-service';
import { AppSettingServiceImpl } from './app-setting.service';

export * from './app-setting-service';
export function provideAppSettingService(): Provider {  
    return { 
        provide: AppSettingService, useClass: AppSettingServiceImpl
    }
}