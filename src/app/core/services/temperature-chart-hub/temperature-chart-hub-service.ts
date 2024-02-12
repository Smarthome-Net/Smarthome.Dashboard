import { Observable } from 'rxjs';
import { Scope, Temperature } from '@models';

export abstract class TemperatureChartHubService {
    abstract getTemperatureData(scope?: Scope): Observable<Temperature[]>;
    abstract destroy(): void;
}