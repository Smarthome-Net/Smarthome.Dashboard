import { Component, OnDestroy, OnInit, inject, viewChild } from '@angular/core';
import { PageEvent, MatPaginator, MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorIntl } from '@angular/material/paginator';
import { map } from 'rxjs';
import { ApexAxisChartSeries, ChartComponent } from 'ng-apexcharts';
import { ScopeType, TemperatureChartRequest, ChartSettings, Temperature, Scope } from "@models";
import { TemperatureChartService, TemperatureChartServiceProider } from '@services/temperature-chart-service';
import { FilterService, FilterServiceProvider } from '@services/filter-service';
import { TemperatureChartHubService, TemperatureChartHubServiceProvider } from '@services/temperature-chart-hub';
import { TempareturChartOptions } from './temperature-chart-options';
import { DashboardViewBarComponent, 
  DashboardViewActionsDirective, 
  DashboardViewTitleDirective, 
  DeviceFilterComponent, 
  GermanPaginatorIntl, 
  matPaginatorOptions } from '@shared';
import { MatCard, MatCardContent, MatCardFooter } from '@angular/material/card';
import { DeviceServiceProvider } from '@services/device-service';

@Component({
  selector: 'app-temperature-value-charts',
  templateUrl: './temperature-value-charts.component.html',
  styleUrls: ['./temperature-value-charts.component.scss'],
  imports: [DashboardViewBarComponent,
    DashboardViewTitleDirective,
    DashboardViewActionsDirective,
    DeviceFilterComponent,
    MatCard,
    MatCardContent,
    ChartComponent,
    MatCardFooter,
    MatPaginator
  ],
  providers: [
    { provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useValue: matPaginatorOptions },
    { provide: MatPaginatorIntl, useClass: GermanPaginatorIntl },
    TemperatureChartServiceProider,
    FilterServiceProvider,
    TemperatureChartHubServiceProvider,
    DeviceServiceProvider
  ]
})
export class TemperatureValueChartsComponent implements OnInit, OnDestroy {
  private temperatureChartService = inject(TemperatureChartService);
  private filterService = inject(FilterService);
  private hubService = inject(TemperatureChartHubService);
  private currentScopeFilter: Scope = {
    scopeType: ScopeType.All,
    value: "",
  }

  readonly chart = viewChild(ChartComponent);

  data: Temperature[] = [];

  paginatorSettings = {
    length: 100,
    pageSize: 10,
    pageIndex: 0,
  };

  chartOptions: Partial<ChartSettings> = TempareturChartOptions

  constructor() { }

  ngOnDestroy(): void {
    this.hubService.destroy();
    this.filterService.destroy();
  }

  ngOnInit(): void {
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

  onPage(event: PageEvent) {
    this.paginatorSettings = event;
    this.loadChartData();
  }

  private createChartRequest(): TemperatureChartRequest {
    return {
      scope: this.currentScopeFilter,
      pageSetting: {
        length: this.paginatorSettings.length,
        pageIndex: this.paginatorSettings.pageIndex,
        pageSize: this.paginatorSettings.pageSize
      }
    };
  }

  private loadChartData() {
    const request = this.createChartRequest();
    this.temperatureChartService.getAllTemperatureData(request)
      .pipe(map(val => {
        this.data = val.temperatures;
        return {
          pageSetting: val.pageSetting,
          chart: this.mapTemperature(val.temperatures),
        }
      }))
      .subscribe(data => {
        this.paginatorSettings = data.pageSetting;
        this.chartOptions.series = data.chart;
      });
  }
}
