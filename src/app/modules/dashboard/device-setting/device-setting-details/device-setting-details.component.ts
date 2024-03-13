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
    room: ['', Validators.required],
    name: ['', Validators.required],
    configuration: this.formBuilder.group({
      interval: [0],
      mqttHost: [''],
      mqttPort: [0],
      ssid: [''],
      ssidPassword: [''],
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
