import { RestService } from "@base/rest-service";
import { IEnvironment } from "src/environments/ienvironment";
import { StatisticRequest, StatisticResponse } from "@models";
import { Observable } from "rxjs";

export abstract class StatisticService extends RestService {

    constructor(env: IEnvironment, pathModify = '') {
        super(env, pathModify);
    }
    
    abstract getStatistic(body: StatisticRequest): Observable<StatisticResponse>;
}