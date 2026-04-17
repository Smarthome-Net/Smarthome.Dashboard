import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { ENV, getEnv } from '@env';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideAppSettingService } from '@services/app-setting-service';
import { provideSettingService } from '@services/setting-service';
import { provideStyleManagerService } from '@services/style-manager-service';
import { provideStorageManager, withLocalStorage } from '@services/storage-manager';

export const applicationConfig: ApplicationConfig = {
    providers: [
        { provide: ENV, useFactory: getEnv },
        provideRouter(routes),
        provideStorageManager(withLocalStorage()),
        provideSettingService(),
        provideAppSettingService(),
        provideStyleManagerService(),
        provideHttpClient(withInterceptorsFromDi())
    ]
};
