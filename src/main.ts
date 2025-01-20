import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent, applicationConfig } from '@app';


bootstrapApplication(AppComponent, applicationConfig)
  .catch(err => console.error(err));
