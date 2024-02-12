import { Component, OnDestroy, OnInit } from '@angular/core';
import { Statistic, ChartSettings, Device, StatisticRequest, ScopeType } from '@models';
import { ALL, FilterService } from '@services/filter-service';
import { DeviceService } from '@services/device-service';
import { StatisticService } from '@services/statistic-service';
import { GroupedObservable, concatMap, groupBy, map, mergeMap } from 'rxjs';
import { StatisticChartOptions } from './statistic-chart-options';

@Component({
  selector: 'app-temperature-statistic',
  templateUrl: './temperature-statistic.component.html',
  styleUrls: ['./temperature-statistic.component.scss']
})
export class TemperatureStatisticComponent implements OnInit, OnDestroy {
  default = ALL;
  statistic: Statistic[] = [];

  deviceGroup: { key: string, devices: Device[] }[] = [];

  chartOptions: Partial<ChartSettings> = StatisticChartOptions

  constructor(private statisticService: StatisticService,
    private filterService: FilterService,
    private deviceService: DeviceService) { }

  ngOnDestroy(): void {
    this.filterService.destroy();
  }

  ngOnInit(): void {
    this.loadDeviceData();

    this.filterService.scopeFilter().subscribe(scope => {
      var request: StatisticRequest = {
        scope: scope
      } 
      this.statisticService.initStatistic(request)
        .subscribe(response => {
          if(response.scope.scopeType === ScopeType.All) {
            response.statistics[0].name = 'Alle';
          }
          this.chartOptions.series = this.mapStatistic(response.statistics);
        })
    })
  }


  onValueChange(event: string[]): void {
    console.log(event);
  }

  reset(): void {

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

  private mapStatistic(statistics: Statistic[]) {
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

  private nameMap: {[key: string]: string} = {
    'min': 'Min',
    'max': 'Max',
    'average': 'Durchschnitt'
  }
}
