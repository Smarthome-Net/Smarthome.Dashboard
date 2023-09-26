import { PageSetting } from "./pageSetting";
import { Scope } from "./scope";

export interface TemperatureChartRequest {
  scope: Scope;
  scopeValue: string;
  pageSetting: PageSetting;
}


