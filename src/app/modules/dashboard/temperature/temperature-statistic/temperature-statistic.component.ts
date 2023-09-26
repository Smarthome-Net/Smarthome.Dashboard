import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { curveBasis } from 'd3-shape';
import { Subscription } from 'rxjs';
import { Statistic, ChartSettings } from 'src/app/core/models';
import { Device } from 'src/app/core/models/device';
import { FilterService, DeviceService, StatisticService } from 'src/app/core/services';

@Component({
  selector: 'app-temperature-statistic',
  templateUrl: './temperature-statistic.component.html',
  styleUrls: ['./temperature-statistic.component.scss']
})
export class TemperatureStatisticComponent implements OnInit, AfterViewChecked, OnDestroy {

  statistic: Statistic[] = [];

  public compareList = [];
  public devices: Device[] = [];

  public lastWidth = 1;

  @ViewChild('parentContainer')
  public parentContainerElement?: ElementRef;

  @ViewChild('allSelected')
  public allSelected?: MatOption;


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
    curve: curveBasis
  };

  private subscriptions: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef,
              private statisticService: StatisticService,
              private filterService: FilterService,
              private deviceService: DeviceService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  ngAfterViewChecked(): void {
    this.getWidth();
  }

  ngOnInit(): void {
    this.deviceService.getAllDevices().subscribe(devices => {
      this.devices = devices;
    });
  }

  public onValueChange(event: string[]): void {
    console.log(event);
    if (event.length === 0)
    {
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
    this.compareList = [];
    // this.statistic = [this.statistic[0]];
  }

  public getWidth(): void
  {
    if (this.parentContainerElement) {
      if (this.parentContainerElement.nativeElement.offsetWidth  !== this.lastWidth)
      {
        this.lastWidth = this.parentContainerElement.nativeElement.offsetWidth ;
        this.cdr.detectChanges();
      }
    }
  }
}
