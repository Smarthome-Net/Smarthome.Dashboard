import { StyleManagerServiceImpl } from './style-manager.service';
import { StyleManagerService } from './style-manager-service';
import { Provider } from '@angular/core';

export * from  './style-manager-service';

export function provideStyleManagerService(): Provider {
    return {
        provide: StyleManagerService,
        useClass: StyleManagerServiceImpl
    };
}