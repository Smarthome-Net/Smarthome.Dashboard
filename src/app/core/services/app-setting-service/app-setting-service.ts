import { CommonSettingStorage } from "@models";
import { Observable } from "rxjs";

export abstract class AppSettingService {
    
    abstract $commonSetting: Observable<CommonSettingStorage>;
    abstract initSettings(): void;

    abstract updateCommonSetting(commonSetting: CommonSettingStorage): void
}