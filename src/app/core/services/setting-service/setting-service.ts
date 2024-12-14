import { RestService } from "@base/rest-service";
import { CommonSetting, PageSetting, Setting } from "@models";
import { Observable } from "rxjs";
import { IEnvironment } from "@env";

export abstract class SettingService extends RestService {
    
    constructor(env: IEnvironment, pathModify = '') {
        super(env, pathModify);
    }

    abstract getAllSettings(): Observable<Setting[]>;
    abstract getCommonSetting(): Observable<CommonSetting>;
}