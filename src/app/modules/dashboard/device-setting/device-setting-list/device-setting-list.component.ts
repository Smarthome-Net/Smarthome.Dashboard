import { Component, OnInit } from '@angular/core';
import { Device } from '@models';
import { DeviceService } from '@services/device-service';

@Component({
  selector: 'app-device-setting-list',
  templateUrl: './device-setting-list.component.html',
  styleUrls: ['./device-setting-list.component.scss'],
  standalone: false
})
export class DeviceSettingListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'location', 'topic', 'details'];
  
  devices: Device[] = [];

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.getAllDevices().subscribe(response => {
      this.devices = response;
    })
  }

}
