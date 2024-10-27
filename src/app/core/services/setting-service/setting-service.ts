import { RestService } from "@base/rest-service";
import { Setting } from "@models";
import { Observable } from "rxjs";
import { IEnvironment } from "src/environments/ienvironment";

export abstract class SettingService extends RestService {
    
    constructor(env: IEnvironment, pathModify = '') {
        super(env, pathModify);
    }

    public abstract getAllSettings(): Observable<Setting[]>;
}