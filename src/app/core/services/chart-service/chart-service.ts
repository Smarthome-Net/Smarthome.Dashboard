import { Observable } from 'rxjs';
import { IEnvironment } from '@env';
import { RestService } from '@base/rest-service';
import { TemperatureChartResponse, TemperatureChartRequest, StatisticRequest, StatisticResponse } from '@models';

export abstract class ChartService extends RestService {
  constructor(env: IEnvironment, pathModify = '') {
    super(env, pathModify);
  }

  abstract getTemperatureChart(temperatureChartRequest: TemperatureChartRequest): Observable<TemperatureChartResponse>;

  abstract getStatisticChart(statisticRequest: StatisticRequest): Observable<StatisticResponse>
}
