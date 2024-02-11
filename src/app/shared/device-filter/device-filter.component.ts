import { Component, OnInit } from '@angular/core';
import { Device, } from '@models';
import { DeviceService } from '@services/device-service';
import { FilterService, ALL } from '@services/filter-service';

@Component({
  selector: 'app-device-filter',
  templateUrl: './device-filter.component.html',
  styleUrls: ['./device-filter.component.scss']
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
    this.deviceService.getListOfRoom().subscribe(rooms => {
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

    this.deviceService.getListOfDevices(value).subscribe(devices => {
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
