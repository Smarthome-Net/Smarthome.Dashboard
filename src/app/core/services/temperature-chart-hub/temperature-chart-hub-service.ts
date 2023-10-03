import { Observable } from 'rxjs';
import { Temperature } from '@models';

export abstract class TemperatureChartHubService {
    abstract getTemperatureData(scope?: string): Observable<Temperature[]>;
    abstract destroy(): void;
}