import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Device, DeviceStatus } from '@models';
import { DeviceService, provideDeviceService } from '@services/device-service';
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
    provideDeviceService()
  ]
})
export class DeviceSettingDetailsComponent implements OnInit {
  private deviceService = inject(DeviceService);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private device?: Device;

  deviceStatus = signal<DeviceStatus | undefined>(undefined);

  deviceForm = this.formBuilder.group({
    id: this.formBuilder.control('', Validators.required),
    room: this.formBuilder.control('', Validators.required),
    name: this.formBuilder.control('', Validators.required),
    configuration: this.formBuilder.group({
      measureInterval: this.formBuilder.control(1, [Validators.min(1), Validators.max(59)]),
      mqttHost: this.formBuilder.control('', Validators.required),
      mqttPort: this.formBuilder.control(1, Validators.max(65535)),
      ssid: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control(''),
    })
  });

  constructor() { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadDeviceStatus(id);
      this.loadDeviceConfig(id);
    });
  }

  onSubmit() {
    // this.deviceService.updateDeviceConfig(this.device!.id, updatedDevice).subscribe(device => {
    //   this.device = device;
    //   this.deviceForm.reset(device);
    // });
  }

  onReset() {
    this.deviceForm.reset(this.device!);
  }

  private loadDeviceStatus(id: string) {
    this.deviceService.getDeviceStatus(id).subscribe(status => {
      this.deviceStatus.set(status);
    });
  }

  private loadDeviceConfig(id: string) {
    this.deviceService.getDeviceConfig(id).subscribe(device => {
      this.device = device;
      this.deviceForm.patchValue(device);
    })
  }
}
