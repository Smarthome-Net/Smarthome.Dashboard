import { SettingService } from './setting-service';
import { SettingServiceImpl } from './setting.service';

export * from './setting-service';
export const SettingServiceProvider =  { provide: SettingService, useClass: SettingServiceImpl };