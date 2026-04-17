import { Component, OnInit, inject, signal } from '@angular/core';
import { form, required, apply, min, max, FormField } from '@angular/forms/signals';
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
import { StorageManagerService } from '@services/storage-manager';

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
    MatFormField,
    MatLabel,
    MatInput,
    MatCardActions,
    MatButton, 
    FormField],
  providers: [
    provideDeviceService()
  ]
})
export class DeviceSettingDetailsComponent implements OnInit {
  private deviceService = inject(DeviceService);
  private route = inject(ActivatedRoute);
  private storageManager = inject(StorageManagerService);
  private device = signal<Device>({
    id: '',
    name: '',
    room: '',
    topic: '',
    configuration: {
      measureInterval: 0,
      mqttHost: '',
      mqttPort: 0,
      password: '',
      ssid: ''
    }
  });

  deviceStatus = signal<DeviceStatus | undefined>(undefined);

  deviceForm = form(this.device, (schemaPath) => {
    required(schemaPath.id),
    required(schemaPath.room),
    required(schemaPath.name),
    apply(schemaPath.configuration, (configurationPath) => {
      min(configurationPath.measureInterval, 1),
      max(configurationPath.measureInterval, 59),
      min(configurationPath.measureInterval, 1),
      max(configurationPath.measureInterval, 65535),
      required(configurationPath.mqttHost),
      required(configurationPath.ssid)
    })
  })

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
    const value = this.storageManager.getValue<Device>('deviceForm');
    this.deviceForm().reset(value!)
  }

  private loadDeviceStatus(id: string) {
    this.deviceService.getDeviceStatus(id).subscribe(status => {
      this.deviceStatus.set(status);
    });
  }

  private loadDeviceConfig(id: string) {
    this.deviceService.getDeviceConfig(id).subscribe(device => {
      this.storageManager.setValue('deviceForm', device);
      this.device.set(device);
    })
  }
}
