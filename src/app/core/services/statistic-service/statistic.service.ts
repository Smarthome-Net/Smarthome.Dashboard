import { Inject, Injectable } from '@angular/core';
import { StatisticService } from './statistic-service';
import { ENV } from 'src/environments/environment.provider';
import { IEnvironment } from 'src/environments/ienvironment';
import { HttpClient } from '@angular/common/http';
import { StatisticRequest, StatisticResponse } from '@models';
import { Observable } from 'rxjs';


@Injectable()
export class StatisticServiceImpl extends StatisticService {
    constructor(@Inject(ENV) env: IEnvironment, private httpclient: HttpClient) { 
      super(env, 'statistic');
    }

  override getStatistic(body: StatisticRequest): Observable<StatisticResponse> {
    return this.httpclient.post<StatisticResponse>(this.path, body);
  }
}
