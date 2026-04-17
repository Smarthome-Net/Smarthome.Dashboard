import { InjectionToken, Provider } from '@angular/core';
import { StorageManagerService } from './storage-manager-service';
import { StorageManagerServiceImpl } from './storage-manager.service';

export * from './storage-manager-service';

export function withLocalStorage(): Storage {
    return localStorage;
}

export function withSessionStorage(): Storage {
    return sessionStorage;
}

export const STOR = new InjectionToken<Storage>('STOR')

export function provideStorageManager(storageInterface: Storage): Provider {    
    return [
        { provide: STOR, useValue: storageInterface },
        { provide: StorageManagerService, useClass: StorageManagerServiceImpl }
    ]
}