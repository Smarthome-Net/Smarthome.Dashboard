import { PageSetting } from './page-setting';
import { Scope } from './scope';
import { Series } from './series';

export interface TemperatureChartResponse {
  scope: Scope;
  pageSetting: PageSetting;
  temperatures: Temperature[];

}

export interface Temperature {
  name: string;
  series: Series[];
}


