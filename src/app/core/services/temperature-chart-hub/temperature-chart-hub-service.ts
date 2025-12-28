import { Observable } from 'rxjs';
import { Scope, Chart } from '@models';

export abstract class TemperatureChartHubService {
    abstract getTemperatureData(scope?: Scope): Observable<Chart<Date, number>[]>;
    abstract destroy(): void;
}