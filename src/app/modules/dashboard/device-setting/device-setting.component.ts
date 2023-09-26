import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/core/services';

@Component({
  selector: 'app-device-setting',
  templateUrl: './device-setting.component.html',
  styleUrls: ['./device-setting.component.scss']
})
export class DeviceSettingComponent implements OnInit {

  constructor(private deviceService: DeviceService) {
    console.log(deviceService);
  }

  ngOnInit(): void {
  }

}
