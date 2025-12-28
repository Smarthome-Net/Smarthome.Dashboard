import { Pagination } from "./page-setting";
import { Scope } from "./scope";

export interface TemperatureChartRequest {
  scope: Scope;
  pagination: Partial<Pagination>;
}


