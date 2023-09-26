import { LegendPosition } from "@swimlane/ngx-charts";
import { CurveFactory } from "d3-shape";

export interface ChartSettings {
  legend: boolean;
  showXAxisLabel: boolean;
  showYAxisLabel: boolean;
  legendPosition: LegendPosition;
  scheme: string;
  xAxis: boolean;
  yAxis: boolean;
  gradient: boolean;
  legendTitle: string;
  roundDomains: boolean;
  curve: CurveFactory
}
