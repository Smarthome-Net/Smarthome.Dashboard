import { Observable } from 'rxjs';
import { IEnvironment } from 'src/environments/ienvironment';
import { RestService } from '../../base/rest-service';
import { TemperatureChartResponse } from '../../models/temperature-chart-response';
import { TemperatureChartRequest } from '../../models/temperature-chart-request';

export abstract class TemperatureChartService extends RestService {
  constructor(env: IEnvironment, pathModify = '') {
    super(env, pathModify);
  }

  abstract getAllTemperatureData(temperatureChartRequest: TemperatureChartRequest): Observable<TemperatureChartResponse>;
}
