import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENV } from 'src/environments/environment.provider';
import { IEnvironment } from 'src/environments/ienvironment';
import { TemperatureChartService } from './temperature-chart-service';
import { TemperatureChartResponse } from '../../models/temperature-chart-response';
import { TemperatureChartRequest } from '../../models/temperature-chart-request';
import { Series } from '../../models';

@Injectable()
export class TemperatureChartServiceImpl extends TemperatureChartService {
  constructor(@Inject(ENV) env: IEnvironment, private httpclient: HttpClient) {
    super(env, 'temperaturechart');
  }

  getAllTemperatureData(temperatureChartRequest: TemperatureChartRequest): Observable<TemperatureChartResponse> {
    return this.httpclient.post<TemperatureChartResponse>(`${this.path}`, temperatureChartRequest).pipe(
      map(value => {
        return this.mapper(value);
      })
    );
  }

  private mapper(response: TemperatureChartResponse) {
    response.temperatures.forEach(temperature => {
      temperature.series = this.dateMapper(temperature.series)
    });
    return response;
  }

  private dateMapper(series: Series[]) {
    series.forEach(item => {
      var date = new Date(item.name);
      item.name = date.toLocaleString();
    });
    return series;
  }

}
