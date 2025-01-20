import { RestService } from "@base/rest-service";
import { CommonSetting, Setting } from "@models";
import { Observable, Subject } from "rxjs";
import { IEnvironment } from "@env";

export abstract class SettingService extends RestService {
    
    constructor(env: IEnvironment, pathModify = '') {
        super(env, pathModify);
    }

    private close = new Subject<boolean>();

    notifyClose(closing: boolean) {
        this.close.next(closing)
    }

    onClose(): Observable<boolean> {
        return this.close;
    }

    abstract getAllSettings(): Observable<Setting[]>;
    abstract getCommonSetting(): Observable<CommonSetting>;
    abstract updateCommonSetting(commonSetting: CommonSetting): Observable<number>;
}