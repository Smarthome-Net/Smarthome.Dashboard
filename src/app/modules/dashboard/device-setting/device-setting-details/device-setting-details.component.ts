import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Device, DeviceStatus } from '@models';
import { DeviceService } from '@services/device-service';

@Component({
  selector: 'app-device-setting-details',
  templateUrl: './device-setting-details.component.html',
  styleUrls: ['./device-setting-details.component.scss']
})
export class DeviceSettingDetailsComponent implements OnInit {
  deviceStatus?: DeviceStatus;
  
  deviceForm = this.formBuilder.group({
    room: this.formBuilder.control('', Validators.required),
    name: this.formBuilder.control('', Validators.required),
    configuration: this.formBuilder.group({
      interval: this.formBuilder.control(1, [Validators.min(1), Validators.max(59)]),
      mqttHost: this.formBuilder.control('', Validators.required),
      mqttPort: this.formBuilder.control(1, Validators.max(65535)),
      ssid: this.formBuilder.control('', Validators.required),
      ssidPassword: this.formBuilder.control(''),
    })
  });
  
  private device?: Device;
  constructor(private deviceService: DeviceService, 
    private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadDeviceStatus(id);
      this.loadDeviceConfig(id);
    });
  }

  onSubmit() {
    console.log(this.deviceForm.value);
  }

  onReset() {
    this.deviceForm.reset(this.device!);
  }

  private loadDeviceStatus(id: string) {
    this.deviceService.getDeviceStatus(id).subscribe(status => {
      this.deviceStatus = status;
    });
  }

  private loadDeviceConfig(id: string) {
    this.deviceService.getDeviceConfig(id).subscribe(device => {
      this.device = device;
      this.deviceForm.patchValue(device);
    })
  }
}
