import { Chart } from './chart';
import { Pagination } from './page-setting';
import { Scope } from './scope';

export interface TemperatureChartResponse {
  scope: Scope;
  pagination: Pagination;
  temperatures: Chart<Date, number>[];
}


