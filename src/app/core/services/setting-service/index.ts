import { Provider } from '@angular/core';
import { SettingService } from './setting-service';
import { SettingServiceImpl } from './setting.service';

export * from './setting-service';
export const SettingServiceProvider: Provider =  { provide: SettingService, useClass: SettingServiceImpl };