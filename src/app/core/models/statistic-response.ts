import { Scope } from "./scope";
import { Statistic } from "./statistic";

export interface StatisticResponse {
    scope: Scope;
    statistics: Statistic[];
}