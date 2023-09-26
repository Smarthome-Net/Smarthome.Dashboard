import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/core/models/device';
import { FilterService } from 'src/app/core/services';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {

  public selectedRoom = 'all';
  public rooms: Device[] = [];

  public selectedDevice = '';
  public devices: Device[] = [];

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
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
