import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs';
import { ApexAxisChartSeries, ChartComponent } from 'ng-apexcharts';
import { ScopeType, TemperatureChartRequest, ChartSettings, Temperature, Scope } from "@models";
import { TemperatureChartService } from '@services/temperature-chart-service';
import { FilterService } from '@services/filter-service';
import { TemperatureChartHubService } from '@services/temperature-chart-hub';
import { TempareturChartOptions } from './temperature-chart-options';

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

  public chartOptions: Partial<ChartSettings> = TempareturChartOptions

  private currentScopeFilter: Scope = {
    scopeType: ScopeType.All,
    value: "",
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

      this.hubService.getTemperatureData(this.currentScopeFilter)
        .subscribe(hubResponse => {
          this.data.forEach(item => {
            const series = hubResponse.find(d => d.name === item.name);
            item.series.splice(0, 0, ...series?.series!)
            item.series.pop();
          })
        
          this.chartOptions.series = this.mapTemperature(this.data);
        });
    });
  }

  private createChartRequest(): TemperatureChartRequest {
    return {
      scope: this.currentScopeFilter,
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
      .pipe(map(val => { 
        this.data = val.temperatures;
        return {
          pageSetting: val.pageSetting,
          chart: this.mapTemperature(val.temperatures),
      }}))
      .subscribe(data => {
        this.paginatorSettings = data.pageSetting;
        this.chartOptions.series = data.chart;
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
