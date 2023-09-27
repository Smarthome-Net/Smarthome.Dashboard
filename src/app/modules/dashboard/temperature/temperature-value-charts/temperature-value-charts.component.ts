import { Component, OnDestroy, OnInit } from '@angular/core';
import { Temperature } from 'src/app/core/models';
import { TemperatureChartRequest } from 'src/app/core/models/temperature-chart-request';
import { Scope } from "src/app/core/models/scope";
import { TemperatureChartService } from 'src/app/core/services/temperature-chart-service';
import { PageEvent } from '@angular/material/paginator';
import { FilterService, ScopeFilter } from 'src/app/core/services';
import { TemperatureChartHubService } from 'src/app/core/services/temperature-chart-hub/temperature-chart-hub.service';

@Component({
  selector: 'app-temperature-value-charts',
  templateUrl: './temperature-value-charts.component.html',
  styleUrls: ['./temperature-value-charts.component.scss']
})
export class TemperatureValueChartsComponent implements OnInit, OnDestroy {

  public data: Temperature[] = [];

  public paginatorSettings = {
    length: 100,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 100]
  };

  private currentScopeFilter: ScopeFilter = {
    scope: Scope.All,
    scopeValue: "",
  }

  constructor(private temperatureChartService: TemperatureChartService,
    private filterService: FilterService,
    private hubService: TemperatureChartHubService) { }

  public ngOnDestroy(): void {
    this.hubService.destroy();
  }

  public ngOnInit(): void {
    this.filterService.getScopeFilter().subscribe(filter => {
      this.currentScopeFilter = filter;
      const request: TemperatureChartRequest = {
        scope: this.currentScopeFilter.scope,
        scopeValue: this.currentScopeFilter.scopeValue,
        pageSetting: {
          pageIndex: 0,
          pageSize: this.paginatorSettings.pageSize,
          totalLenght: this.paginatorSettings.length,
        }
      }
      
      this.loadChartData(request);

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

  public onPage(event: PageEvent) {
    this.paginatorSettings.length = event.length;
    this.paginatorSettings.pageSize = event.pageSize;

    const request: TemperatureChartRequest = {
      scope: this.currentScopeFilter.scope,
      scopeValue: this.currentScopeFilter.scopeValue,
      pageSetting: {
        pageIndex: event.pageIndex,
        pageSize: this.paginatorSettings.pageSize,
        totalLenght: this.paginatorSettings.length,
      }
    }
    this.loadChartData(request);
  }

  private loadChartData(request: TemperatureChartRequest) {
    this.temperatureChartService.getAllTemperatureData(request).subscribe(data => {
      this.paginatorSettings.length = data.pageSetting.totalLenght;
      this.paginatorSettings.pageSize = data.pageSetting.pageSize;
      this.data = data.temperatures;
    });
  }

}
