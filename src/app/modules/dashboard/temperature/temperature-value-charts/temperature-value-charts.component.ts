import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartSettings, Series, Temperature } from 'src/app/core/models';
import { TemperatureChartRequest } from 'src/app/core/models/temperature-chart-request';
import { Scope } from "src/app/core/models/scope";
import { TemperatureChartService } from 'src/app/core/services/temperature-chart-service';
import { PageEvent } from '@angular/material/paginator';
import { FilterService, ScopeFilter } from 'src/app/core/services';
import { curveCardinal, curveBumpX } from 'd3-shape';
import { TemperatureChartHubService } from 'src/app/core/services/temperature-chart-hub/temperature-chart-hub.service';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-temperature-value-charts',
  templateUrl: './temperature-value-charts.component.html',
  styleUrls: ['./temperature-value-charts.component.scss']
})
export class TemperatureValueChartsComponent implements OnInit, AfterViewChecked, OnDestroy {

  public data: Temperature[] = [];

  public lastWidth = 1;

  @ViewChild('parentContainer')
  public parentContainerElement?: ElementRef;

  // chart configuration
  public chartSetting: ChartSettings = {
    gradient: true,
    legend: true,
    legendPosition: LegendPosition.Below,
    scheme: 'vivid',
    showXAxisLabel: true,
    showYAxisLabel: true,
    xAxis: true,
    yAxis: true,
    legendTitle: 'Legende',
    roundDomains: true,
    curve: curveBumpX
  };

  public paginatorSettings = {
    length: 100,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 100]
  };

  private currentScopeFilter: ScopeFilter = {
    scope: Scope.All,
    scopeValue: "",
  }

  constructor(private cdr: ChangeDetectorRef,
    private temperatureChartService: TemperatureChartService,
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
        console.log(hubResponse);
        const copy: Temperature[] = Object.assign([], this.data);
        hubResponse.forEach(item => {
          const singleData = copy.find(d => d.name === item.name);
          singleData?.series.unshift(...item.series);
          singleData?.series.splice(10);
        });
        this.data = copy
        console.log(copy);
      });
    });
  }



  public ngAfterViewChecked(): void {
    this.getWidth();
  }

  public getWidth(): void {
    if (this.parentContainerElement) {
      if (this.parentContainerElement.nativeElement.offsetWidth !== this.lastWidth) {
        this.lastWidth = this.parentContainerElement.nativeElement.offsetWidth;
        this.cdr.detectChanges();
      }
    }
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
