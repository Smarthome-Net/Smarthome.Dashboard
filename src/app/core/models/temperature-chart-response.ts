import { PageSetting } from './pageSetting';
import { Scope } from './scope';
import { Series } from './series';

export interface TemperatureChartResponse {
  scope: Scope;
  scopeValue: string;
  pageSetting: PageSetting;
  temperatures: Temperature[];

}

export interface Temperature {
  name: string;
  series: Series[];
}


