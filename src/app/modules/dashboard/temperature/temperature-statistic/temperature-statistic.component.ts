import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { Statistic, ChartSettings, Device } from '@models';
import { FilterService } from '@services/filter-service';
import { DeviceService } from '@services/device-service';
import { StatisticService } from '@services/statistic-service';

@Component({
  selector: 'app-temperature-statistic',
  templateUrl: './temperature-statistic.component.html',
  styleUrls: ['./temperature-statistic.component.scss']
})
export class TemperatureStatisticComponent implements OnInit, OnDestroy {

  statistic: Statistic[] = [];

  public devices: Device[] = [];

  @ViewChild('allSelected')
  public allSelected?: MatOption;

  public chartOptions: Partial<ChartSettings> = {
    series: [
      {
        name: "myRoom",
        data: [{
          x: 'Min',
          y: 22
        }, {
          x: 'Durchschnitt',
          y: 33
        }, {
          x: 'Max',
          y: 42
        }]
      },
      {
        name: "myOtherRool",
        data: [{
          x: 'Min',
          y: 20
        }, {
          x: 'Durchschnitt',
          y: 32
        }, {
          x: 'Max',
          y: 39
        }]
      },
    ],
    chart: {
      type: "bar",
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
    yaxis: {
      title: {
        text: "Temperatur in °C"
      },
      labels: {
        formatter(val) {
          return val.toFixed(2);
        },
      }
    },
    legend: {
      position: "bottom",
      horizontalAlign: "left",
    }
  }


  constructor(private statisticService: StatisticService,
    private filterService: FilterService,
    private deviceService: DeviceService) { }

  ngOnDestroy(): void {
    this.filterService.destroy();
  }

  ngOnInit(): void {
    this.deviceService.getAllDevices().subscribe(devices => {
      this.devices = devices;
    });

    this.statisticService.initStatistic();
  }

  public onValueChange(event: string[]): void {
    if (event.length === 0) {
      this.reset();
      return;
    }
    const value = event[event.length - 1];
    const result = this.statistic.find(p => p.name === value);
    if (result !== undefined) {
      return;
    }
    console.log(this.statistic);
  }

  public toggleAllSelected(): void {
    if (this.allSelected?.selected) {
      console.log('Alle');
    }
    else {
      console.log('Nothing');
    }
  }

  public reset(): void {
    // this.statistic = [this.statistic[0]];
  }
}
