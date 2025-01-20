import { Observable } from 'rxjs';
import { IEnvironment } from '@env';
import { RestService } from '@base/rest-service';
import { Device, DeviceStatus } from '@models';

export abstract class DeviceService extends RestService {
  
  constructor(env: IEnvironment, pathModify = '') {
    super(env, pathModify);
  }

  abstract getDevicesByRoom(room: string): Observable<Device[]>;
  abstract getAllDevices(): Observable<Device[]>;
  abstract getDeviceStatus(deviceId: string): Observable<DeviceStatus>;
  abstract getDeviceConfig(deviceId: string): Observable<Device>;
  abstract updateDeviceConfig(deviceId: string, device: Device): Observable<Device>;
}
