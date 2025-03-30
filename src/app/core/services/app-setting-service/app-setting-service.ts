import { CommonSetting } from "@models";
import { Observable } from "rxjs";

export abstract class AppSettingService {
    
    abstract $commonSetting: Observable<CommonSetting>;
    abstract initSettings(): void;

    abstract updateCommonSetting(commonSetting: CommonSetting): void
}