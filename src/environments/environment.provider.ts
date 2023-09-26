import { InjectionToken } from '@angular/core';
import { environment } from './environment';
import { IEnvironment } from './ienvironment';

export const ENV = new InjectionToken<IEnvironment>('env');

export function getEnv(): IEnvironment {
  return environment;
}
