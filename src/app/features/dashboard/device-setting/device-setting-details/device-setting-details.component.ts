import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Device, DeviceStatus } from '@models';
import { DeviceService, DeviceServiceProvider } from '@services/device-service';
import { DashboardViewBarComponent, 
  DashboardViewTitleDirective, 
  ConnectionStatusComponent, 
  BatteryStatusComponent } from '@shared';
import { MatCard, 
  MatCardHeader, 
  MatCardTitle, 
  MatCardContent, 
  MatCardActions } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-device-setting-details',
  templateUrl: './device-setting-details.component.html',
  styleUrls: ['./device-setting-details.component.scss'],
  imports: [DashboardViewBarComponent,
    DashboardViewTitleDirective,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ConnectionStatusComponent,
    BatteryStatusComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatCardActions,
    MatButton
  ],
  providers: [
    DeviceServiceProvider
  ]
})
export class DeviceSettingDetailsComponent implements OnInit {
  private deviceService = inject(DeviceService);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);

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
  constructor() { }

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
