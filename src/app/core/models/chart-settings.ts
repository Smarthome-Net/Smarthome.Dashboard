import { ApexAxisChartSeries, 
    ApexChart, 
    ApexXAxis, 
    ApexStroke, 
    ApexDataLabels, 
    ApexMarkers, 
    ApexYAxis, 
    ApexGrid, 
    ApexLegend, 
    ApexTitleSubtitle } from "ng-apexcharts";

    export interface ChartSettings {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    markers: ApexMarkers;
    colors: string[];
    yaxis: ApexYAxis;
    grid: ApexGrid;
    legend: ApexLegend;
    title: ApexTitleSubtitle
}
