import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceStatus } from '@models';
import { DeviceService } from '@services/device-service';

@Component({
  selector: 'app-device-setting-details',
  templateUrl: './device-setting-details.component.html',
  styleUrls: ['./device-setting-details.component.scss']
})
export class DeviceSettingDetailsComponent implements OnInit {
  deviceStatus?: DeviceStatus;
  
  constructor(private deviceService: DeviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadDeviceStatus(id);
    });
  }

  private loadDeviceStatus(id: string) {
    this.deviceService.getDeviceStatus(id).subscribe(status => {
      console.log(status);
      this.deviceStatus = status;
    });
  }
}
