export type StorageKey = 'deviceForm' | 'commonSetting';

export abstract class StorageManagerService {
    abstract setValue<TValue>(key: StorageKey, value: TValue): void;
    abstract getValue<TValue>(key: StorageKey): TValue | null;
}