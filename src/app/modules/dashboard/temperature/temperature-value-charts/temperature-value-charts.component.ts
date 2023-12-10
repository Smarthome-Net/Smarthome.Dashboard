import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs';
import { ApexAxisChartSeries, ChartComponent } from 'ng-apexcharts';

import { Scope, TemperatureChartRequest, ChartSettings, Temperature, ScopeFilter } from "@models";
import { TemperatureChartService } from '@services/temperature-chart-service';
import { FilterService } from '@services/filter-service';
import { TemperatureChartHubService } from '@services/temperature-chart-hub';



@Component({
  selector: 'app-temperature-value-charts',
  templateUrl: './temperature-value-charts.component.html',
  styleUrls: ['./temperature-value-charts.component.scss']
})
export class TemperatureValueChartsComponent implements OnInit, OnDestroy {
  @ViewChild("temperatureChart", { static: false }) chart?: ChartComponent;
  
  public data: Temperature[] = [];

  public paginatorSettings = {
    length: 100,
    pageSize: 10,
    pageIndex: 0,
  };

  public chartOptions: Partial<ChartSettings> = {
    series: [ ],
    chart: {
      type: "line",
      height: 500,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    markers: {
      size: 1
    },
    xaxis: {
      type: 'category',
      title: {
        text: "Uhrzeit"
      }
    },
    yaxis: {
      title: {
        text: "Temperatur in °C"
      },
      labels: {
        formatter(val) {
          return val.toFixed(2);
        },
      },
      min: 5,
      max: 40
    },
    legend: {
      position: "bottom",
      horizontalAlign: "left",
    }
  }

  private currentScopeFilter: ScopeFilter = {
    scope: Scope.All,
    scopeValue: "",
  }

  constructor(private temperatureChartService: TemperatureChartService,
    private filterService: FilterService,
    private hubService: TemperatureChartHubService) { }

  public ngOnDestroy(): void {
    this.hubService.destroy();
    this.filterService.destroy();
  }

  public ngOnInit(): void {
    this.filterService.scopeFilter().subscribe(filter => {
      this.currentScopeFilter = filter;      
      this.loadChartData();

      this.hubService.getTemperatureData(this.currentScopeFilter.scopeValue).subscribe(hubResponse => {
        const copy: Temperature[] = Object.assign([], this.data);
        hubResponse.forEach(item => {
          const singleData = copy.find(d => d.name === item.name);
          singleData?.series.unshift(...item.series);
          singleData?.series.splice(this.paginatorSettings.pageSize);
        });
        this.data = copy
      });
    });
  }

  private createChartRequest(): TemperatureChartRequest {
    return {
      scope: this.currentScopeFilter.scope,
      scopeValue: this.currentScopeFilter.scopeValue,
      pageSetting: this.paginatorSettings
    };
  }

  public onPage(event: PageEvent) {
    this.paginatorSettings = event;
    this.loadChartData();
  }

  private loadChartData() {
    const request = this.createChartRequest();
    this.temperatureChartService.getAllTemperatureData(request)
      .pipe(map(val => { return {
        pageSetting: val.pageSetting,
        chart: this.mapTemperature(val.temperatures)
      }}))
      .subscribe(data => {
        this.paginatorSettings = data.pageSetting;
        this.chartOptions.series = data.chart;
        console.log(data);
      });
  }
  
  mapTemperature(temperatures: Temperature[]): ApexAxisChartSeries {
    return temperatures.map(temperature => {
      return {
        name: temperature.name,
        data: temperature.series.map(serie => {
          return {
            x: serie.name,
            y: serie.value
          }
        })
      }
     });
  }
}
