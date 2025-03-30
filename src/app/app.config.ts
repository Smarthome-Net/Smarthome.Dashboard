import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ENV, getEnv } from '@env';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideAppSettingService } from '@services/app-setting-service';
import { provideSettingService } from '@services/setting-service';
import { provideStyleManagerService } from '@services/style-manager-service';

export const applicationConfig: ApplicationConfig = {
    providers: [
        { provide: ENV, useFactory: getEnv },
        provideRouter(routes),
        provideSettingService(),
        provideAppSettingService(),
        provideStyleManagerService(),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
};
