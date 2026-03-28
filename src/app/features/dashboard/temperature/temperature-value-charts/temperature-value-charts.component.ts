import { Component, OnDestroy, OnInit, inject, signal, viewChild } from '@angular/core';
import { PageEvent, MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { map, Subscription } from 'rxjs';
import { ApexAxisChartSeries, ChartComponent } from 'ng-apexcharts';
import { ScopeType, TemperatureChartRequest, ChartSettings, Scope, Chart } from "@models";
import { ChartService, provideChartService } from '@services/chart-service';
import { FilterService, provideFilterService } from '@services/filter-service';
import { TemperatureChartHubService, provideTemperatureChartHubService } from '@services/temperature-chart-hub';
import { TempareturChartOptions } from './temperature-chart-options';
import { DashboardViewBarComponent, 
  DashboardViewActionsDirective, 
  DashboardViewTitleDirective, 
  DeviceFilterComponent, 
  GermanPaginatorIntl } from '@shared';
import { MatCard, MatCardContent, MatCardFooter } from '@angular/material/card';
import { provideDeviceService } from '@services/device-service';
import { AppSettingService } from '@services/app-setting-service';

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
    { provide: MatPaginatorIntl, useClass: GermanPaginatorIntl },
    provideChartService(),
    provideFilterService(),
    provideTemperatureChartHubService(),
    provideDeviceService()
  ]
})
export class TemperatureValueChartsComponent implements OnInit, OnDestroy {
  private chartService = inject(ChartService);
  private filterService = inject(FilterService);
  private appSettingService = inject(AppSettingService);
  private hubService = inject(TemperatureChartHubService);
  private currentScopeFilter = signal<Scope>({
    scopeType: ScopeType.All,
    value: "",
  })

  private subscriptions = signal<Subscription[]>([]);

  readonly chart = viewChild(ChartComponent);

  data = signal<Chart<Date, number>[]>([]);

  paginatorSettings = signal({
    length: 100,
    pageSize: 10,
    pageIndex: 0,
  });

  chartOptions: Partial<ChartSettings> = TempareturChartOptions

  constructor() { }

  ngOnDestroy(): void {
    this.hubService.destroy();
    this.filterService.destroy();
    this.subscriptions().forEach(sub => sub.unsubscribe());
    this.subscriptions.set([]);
  }

  ngOnInit(): void {
    this.subscriptions().push(this.appSettingService.$commonSetting.subscribe(commonSetting => { 
      this.paginatorSettings.update(p => ({ ...p, pageSize: commonSetting.pageLength }));
    }));
    this.filterService.scopeFilter().subscribe(filter => {
      this.currentScopeFilter.set(filter);
      this.loadChartData();

      this.hubService.getTemperatureData(this.currentScopeFilter())
        .subscribe(hubResponse => {
          this.data().forEach(item => {
            const series = hubResponse.find(d => d.name === item.name);
            item.series.splice(0, 0, ...series?.series!)
            item.series.pop();
          })

          this.chartOptions.series = this.mapTemperature(this.data());
        });
    });
  }

  mapTemperature(temperatures: Chart<Date, number>[]): ApexAxisChartSeries {
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
    this.paginatorSettings.set(event);
    this.loadChartData();
  }

  private createChartRequest(): TemperatureChartRequest {
    return {
      scope: this.currentScopeFilter(),
      pagination: {
        length: this.paginatorSettings().length,
        pageIndex: this.paginatorSettings().pageIndex,
        pageSize: this.paginatorSettings().pageSize
      }
    };
  }

  private loadChartData() {
    const request = this.createChartRequest();
    this.chartService.getTemperatureChart(request)
      .pipe(map(val => {
        this.data.set(val.temperatures);
        return {
          pageSetting: val.pagination,
          chart: this.mapTemperature(val.temperatures),
        }
      }))
      .subscribe(data => {
        this.paginatorSettings.set(data.pageSetting);
        this.chartOptions.series = data.chart;
      });
  }
}
