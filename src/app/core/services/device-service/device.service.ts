import { HttpClient } from '@angular/common/http';
import { Inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { ENV, IEnvironment   } from '@env';
import { Device, DeviceStatus } from '@models';
import { DeviceService } from './device-service';

@Injectable()
export class DeviceServiceImpl extends DeviceService {
  
  public constructor(@Inject(ENV) env: IEnvironment, private httpclient: HttpClient) {
    super(env, 'device');
  }

  override getAllDevices(): Observable<Device[]> {
    return this.httpclient.get<Device[]>(`${this.path}`);
  }

  override getDevicesByRoom(room: string): Observable<Device[]> {
    return this.httpclient.get<Device[]>(`${this.path}/${room}`);
  }

  override getDeviceStatus(deviceId: string): Observable<DeviceStatus> {
    return this.httpclient.get<DeviceStatus>(`${this.path}/${deviceId}/status`);
  }
  override getDeviceConfig(deviceId: string): Observable<Device> {
    return this.httpclient.get<Device>(`${this.path}/${deviceId}/config`);
  }
  override updateDeviceConfig(deviceId: string, device: Device): Observable<Device> {
    return this.httpclient.post<Device>(`${this.path}/${deviceId}/config`, device);
  }

}
