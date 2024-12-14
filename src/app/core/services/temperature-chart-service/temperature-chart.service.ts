import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENV, IEnvironment } from '@env';
import { TemperatureChartService } from './temperature-chart-service';
import { TemperatureChartResponse, TemperatureChartRequest } from '@models';

@Injectable()
export class TemperatureChartServiceImpl extends TemperatureChartService {
  constructor(@Inject(ENV) env: IEnvironment, private httpclient: HttpClient) {
    super(env, 'temperaturechart');
  }

  getAllTemperatureData(temperatureChartRequest: TemperatureChartRequest): Observable<TemperatureChartResponse> {
    return this.httpclient.post<TemperatureChartResponse>(`${this.path}`, temperatureChartRequest);
  }
}
