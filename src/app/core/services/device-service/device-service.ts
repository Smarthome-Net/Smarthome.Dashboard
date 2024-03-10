import { Observable } from 'rxjs';
import { IEnvironment } from 'src/environments/ienvironment';
import { RestService } from '@base/rest-service';
import { Device, DeviceStatus } from '@models';

export abstract class DeviceService extends RestService {
  
  constructor(env: IEnvironment, pathModify = '') {
    super(env, pathModify);
  }

  abstract getDevicesByRoom(room: string): Observable<Device[]>;
  abstract getAllDevices(): Observable<Device[]>;
  abstract getDeviceStatus(deviceId: string): Observable<DeviceStatus>;
  abstract getDeviceConfig(deviceId: string): void;
  abstract updateDeviceConfig(deviceId: string): void;
}
