import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Statistic, ChartSettings, Device, StatisticRequest, ScopeType, Scope } from '@models';
import { ALL, FilterService } from '@services/filter-service';
import { DeviceService } from '@services/device-service';
import { StatisticService } from '@services/statistic-service';
import { GroupedObservable, concatMap, groupBy, map, mergeMap } from 'rxjs';
import { StatisticChartOptions } from './statistic-chart-options';
import { ApexAxisChartSeries, ChartComponent } from 'ng-apexcharts';
import { DashboardViewBarComponent, DashboardViewTitleDirective } from '@shared/dashboard-view-bar/';
import { DeviceFilterComponent } from '@shared/device-filter';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption, MatOptgroup } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-temperature-statistic',
    templateUrl: './temperature-statistic.component.html',
    styleUrls: ['./temperature-statistic.component.scss'],
    imports: [ DashboardViewBarComponent, 
      DashboardViewTitleDirective, 
      DeviceFilterComponent, 
      MatFormField, 
      MatLabel, 
      MatSelect, 
      MatOption, 
      MatOptgroup, 
      MatButton, 
      MatIcon, 
      MatCard, 
      MatCardContent, 
      ChartComponent
    ]
})
export class TemperatureStatisticComponent implements OnInit, OnDestroy {
  @ViewChild("temperatureChart", { static: false }) chart?: ChartComponent;
  default = ALL;
  statistic: Statistic[] = [];

  deviceGroup: { key: string, devices: Device[] }[] = [];

  chartOptions: Partial<ChartSettings> = StatisticChartOptions

  currentSelection: (Device | string)[] = [];

  constructor(private statisticService: StatisticService,
    private filterService: FilterService,
    private deviceService: DeviceService) { }

  ngOnDestroy(): void {
    this.filterService.destroy();
  }

  ngOnInit(): void {
    this.loadDeviceData();

    this.filterService.scopeFilter().subscribe(scope => {
      this.loadStatistic(scope, true);
    })
  }

  reset(): void {
    this.currentSelection = [];
    this.statistic.splice(1);
    this.chartOptions.series = this.mapStatistic(this.statistic);
  }

  onValueChange(event: (string | Device)[]): void {
    if (this.isAddition(this.currentSelection.length, event.length)) {
      this.handleAddition(event);
    }

    if (this.isRemoving(this.currentSelection.length, event.length)) {
      this.handleRemoving(event);
    }

    this.currentSelection = event;
  }

  private handleRemoving(event: (string | Device)[]) {
    var removed = this.getItem(this.currentSelection, event);
    if(!removed) {
      return;
    }
    const statistics = this.filterStatistic(removed);
    if (statistics.length > 0) {
      var last = statistics[statistics.length - 1];
      var index = this.statistic.indexOf(last);
      console.log(index);
      this.statistic.splice(index, 1);
      this.chartOptions.series = this.mapStatistic(this.statistic);
    }
  }

  private handleAddition(event: (string | Device)[]) {
    const added = this.getItem(event, this.currentSelection);
    if(!added) {
      return;
    }
    const scope = this.createScope(added);
    this.loadStatistic(scope);
  }

  private loadStatistic(scope: Scope, withReset = false) {
    var request: StatisticRequest = {
      scope: scope
    };
    this.statisticService.getStatistic(request)
      .subscribe(response => {
        if(withReset) {
          this.statistic = [];
        }
        if (response.scope.scopeType === ScopeType.All) {
          response.statistic.name = 'Alle';
        }
        this.statistic.push(response.statistic);
        this.chartOptions.series = this.mapStatistic(this.statistic);
      });
  }

  private filterStatistic(removed: string | Device) {
    let results: Statistic[] = [];
    if(typeof removed === 'string') {
      results = this.statistic.filter(i => i.name === 'Alle');
    } else {
      const topic = removed?.topic;
      results = this.statistic.filter(i => i.name === topic)
    }
    return results;
  }

  private createScope(added: string | Device) {
    let scope: Scope;
    if (typeof added === 'string') {
      scope = {
        scopeType: ScopeType.All,
        value: ''
      };
    } else {
      scope = {
        scopeType: ScopeType.Device,
        value: `${added?.room}/${added?.name}`
      };
    }
    return scope;
  }

  private getItem(iterate: (string | Device)[], actual: (string | Device)[]) {
    for (let index = 0; index < iterate.length; index++) {
      const item = iterate[index];
      if (actual.includes(item)) {
        continue;
      }
      return item;
    }
    return null;
  }

  private loadDeviceData() {
    this.deviceService.getAllDevices()
      .pipe(concatMap(device => device),
        groupBy(key => key.room),
        mergeMap(i => this.mapDeviceGroup(i)))
      .subscribe(devices => {
        const result = this.deviceGroup.find(d => d.key === devices.key);
        if (!result) {
          this.deviceGroup.push({
            key: devices.key,
            devices: [devices.device]
          });
          return;
        }
        result?.devices.push(devices.device);
      });
  }

  private mapDeviceGroup(group: GroupedObservable<string, Device>) {
    return group.pipe(
      map(device => {
        return {
          key: group.key,
          device: device
        };
      }));
  }

  private mapStatistic(statistics: Statistic[]): ApexAxisChartSeries {
    return statistics.map(statistic => {
      return {
        name: statistic.name,
        data: statistic.series.map(s => {
          return {
            x: this.nameMap[s.name],
            y: s.value
          }
        })
      }
    })
  }

  private nameMap: { [key: string]: string } = {
    'min': 'Min',
    'max': 'Max',
    'average': 'Durchschnitt'
  }

  private isAddition(currentLength: number, eventLength: number) {
    return eventLength > currentLength;
  }

  private isRemoving(currentLength: number, eventLength: number) {
    return currentLength > eventLength;
  }
}
