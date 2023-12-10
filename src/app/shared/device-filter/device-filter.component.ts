import { Component, OnInit } from '@angular/core';
import { Device } from '@models';
import { FilterService } from '@services/filter-service';

@Component({
  selector: 'app-device-filter',
  templateUrl: './device-filter.component.html',
  styleUrls: ['./device-filter.component.scss']
})
export class DeviceFilterComponent implements OnInit {

  public selectedRoom = 'all';
  public rooms: Device[] = [];

  public selectedDevice = '';
  public devices: Device[] = [];

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    this.filterService.getRoomList().subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  public roomChange(value: string): void {
    this.filterService.setSelectedRoom(value);
    if (value === 'all') {
      this.devices = [];
      this.selectedDevice = '';
      return;
    }

    this.filterService.getDeviceList(value).subscribe(devices => {
      if (this.devices[0] !== devices[0]) {
        this.deviceChange('all', false);
      }
      this.devices = devices;
    });
  }

  public deviceChange(value: string, skipFilter = true): void {
    this.selectedDevice = value;
    if(skipFilter) {
      this.filterService.setSelectedDevice(value);
    }
  }

}
