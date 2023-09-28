import { Observable } from 'rxjs';
import { IEnvironment } from 'src/environments/ienvironment';
import { RestService } from '@base/rest-service';
import { TemperatureChartResponse, TemperatureChartRequest } from '@models';
export abstract class TemperatureChartService extends RestService {
  constructor(env: IEnvironment, pathModify = '') {
    super(env, pathModify);
  }

  abstract getAllTemperatureData(temperatureChartRequest: TemperatureChartRequest): Observable<TemperatureChartResponse>;
}
