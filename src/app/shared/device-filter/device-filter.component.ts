import { Component, OnInit, inject } from '@angular/core';
import { Device, } from '@models';
import { DeviceService } from '@services/device-service';
import { FilterService, ALL } from '@services/filter-service';
import { distinct, mergeMap, toArray } from 'rxjs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';


@Component({
    selector: 'app-device-filter',
    templateUrl: './device-filter.component.html',
    styleUrls: ['./device-filter.component.scss'],
    imports: [MatFormField, MatLabel, MatSelect, MatOption]
})
export class DeviceFilterComponent implements OnInit {
  private filterService = inject(FilterService);
  private deviceService = inject(DeviceService);

  default = ALL;
  selectedRoom = ALL;
  rooms: Device[] = [];
  selectedDevice = '';
  devices: Device[] = [];

  constructor() { }

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

  roomChange(value: string): void {
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

  deviceChange(value: string, skipFilter = true): void {
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
