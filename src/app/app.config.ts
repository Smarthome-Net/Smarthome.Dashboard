import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ENV, getEnv } from '@env';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';

export const applicationConfig: ApplicationConfig = {
    providers: [
        { provide: ENV, useFactory: getEnv },
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
};
