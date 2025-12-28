import { Series } from "./series";

export interface Chart<TName, TValue> {
    name: string;
    series: Series<TName, TValue>[]
}