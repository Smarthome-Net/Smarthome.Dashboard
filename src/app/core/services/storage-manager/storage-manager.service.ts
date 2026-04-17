import { inject, Injectable } from '@angular/core';
import { StorageKey, StorageManagerService } from './storage-manager-service';
import { STOR } from './index';

@Injectable()
export class StorageManagerServiceImpl implements StorageManagerService {
  private readonly storage = inject(STOR)

  setValue<TValue>(key: StorageKey, value: TValue): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getValue<TValue>(key: StorageKey): TValue | null {
    const item = this.storage.getItem(key);
    if(!item) {
      return null;
    }
    return JSON.parse(item) as TValue;
  }

}
