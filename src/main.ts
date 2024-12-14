import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { ENV, getEnv } from '@env';
import { AppRoutingModule, AppComponent } from '@app';
import { CoreModule } from '@core';



bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, CoreModule, SharedModule),
        { provide: ENV, useFactory: getEnv },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
