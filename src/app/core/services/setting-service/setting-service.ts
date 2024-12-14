import { RestService } from "@base/rest-service";
import { CommonSetting, PageSetting, Setting } from "@models";
import { Observable } from "rxjs";
import { IEnvironment } from "@env";

export abstract class SettingService extends RestService {
    
    constructor(env: IEnvironment, pathModify = '') {
        super(env, pathModify);
    }

    public abstract getAllSettings(): Observable<Setting[]>;

    public abstract getCommonSetting(): Observable<CommonSetting>;
}