import { Injectable, inject } from '@angular/core';
import { StatisticService } from './statistic-service';
import { ENV, IEnvironment } from '@env';
import { HttpClient } from '@angular/common/http';
import { StatisticRequest, StatisticResponse } from '@models';
import { Observable } from 'rxjs';


@Injectable()
export class StatisticServiceImpl extends StatisticService {
    private httpclient = inject(HttpClient);

    constructor() {
      const env = inject<IEnvironment>(ENV);
      super(env, 'statistic');
    }

  override getStatistic(body: StatisticRequest): Observable<StatisticResponse> {
    return this.httpclient.post<StatisticResponse>(this.path, body);
  }
}
