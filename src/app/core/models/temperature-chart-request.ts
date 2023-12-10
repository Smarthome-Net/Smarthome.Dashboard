import { PageSetting } from "./page-setting";
import { Scope } from "./scope";

export interface TemperatureChartRequest {
  scope: Scope;
  scopeValue: string;
  pageSetting: PageSetting;
}


