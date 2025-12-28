import { Chart } from "./chart";
import { Scope } from "./scope";

export interface StatisticResponse {
    scope: Scope;
    statistic: Chart<string, number>;
}