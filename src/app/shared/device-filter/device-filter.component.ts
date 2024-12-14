import { Component, OnInit } from '@angular/core';
import { Device, } from '@models';
import { DeviceService, DeviceServiceProvider } from '@services/device-service';
import { FilterService, ALL, FilterServiceProvider } from '@services/filter-service';
import { distinct, mergeMap, toArray } from 'rxjs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';


@Component({
    selector: 'app-device-filter',
    templateUrl: './device-filter.component.html',
    styleUrls: ['./device-filter.component.scss'],
    imports: [MatFormField, MatLabel, MatSelect, MatOption],
    providers: [ DeviceServiceProvider,
      FilterServiceProvider
    ]
})
export class DeviceFilterComponent implements OnInit {
  public default = ALL;
  public selectedRoom = ALL;
  public rooms: Device[] = [];

  public selectedDevice = '';
  public devices: Device[] = [];

  constructor(private filterService: FilterService,
    private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.getAllDevices()
      .pipe(
        mergeMap(d => d),
        distinct(d => d.room),
        toArray())
      .subscribe(rooms => {
        this.rooms = rooms;
      })
  }

  public roomChange(value: string): void {
    this.filterService.updateScope(value)

    if (value === ALL) {
      this.devices = [];
      this.selectedDevice = '';
      return;
    }

    this.deviceService.getDevicesByRoom(value).subscribe(devices => {
      if (this.devices[0] !== devices[0]) {
        this.deviceChange(ALL, false);
      }
      this.devices = devices;
    });
  }

  public deviceChange(value: string, skipFilter = true): void {
    this.selectedDevice = value;
    let scopeValue = this.selectedRoom;

    if (value !== ALL) {
      scopeValue += `/${value}`;
    }

    if (skipFilter) {
      this.filterService.updateScope(scopeValue);
    }
  }
}
