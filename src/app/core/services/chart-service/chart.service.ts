import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ENV, IEnvironment } from '@env';
import { ChartService } from './chart-service';
import { TemperatureChartResponse, TemperatureChartRequest, StatisticRequest, StatisticResponse } from '@models';

@Injectable()
export class ChartServiceImpl extends ChartService {
  
  private httpclient = inject(HttpClient);

  constructor() {
    const env = inject<IEnvironment>(ENV);
    super(env, 'chart');
  }

  override getTemperatureChart(temperatureChartRequest: TemperatureChartRequest): Observable<TemperatureChartResponse> {
    return this.httpclient.post<TemperatureChartResponse>(`${this.path}/temperature`, temperatureChartRequest);
  }

  override getStatisticChart(statisticRequest: StatisticRequest): Observable<StatisticResponse> {
    return this.httpclient.post<StatisticResponse>(`${this.path}/statistic`, statisticRequest);
  }
}
