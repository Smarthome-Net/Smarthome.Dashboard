import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { ENV, getEnv } from 'src/environments/environment.provider';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CoreModule } from './app/core/core.module';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, CoreModule, SharedModule),
        { provide: ENV, useFactory: getEnv },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
