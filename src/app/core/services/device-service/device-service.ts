import { Observable } from 'rxjs';
import { IEnvironment } from 'src/environments/ienvironment';
import { RestService } from '../../base/rest-service';
import { Device } from '../../models/device';

export abstract class DeviceService extends RestService {
  constructor(env: IEnvironment, pathModify = '') {
    super(env, pathModify);
  }
  abstract getListOfRoom(): Observable<Device[]>;
  abstract getListOfDevices(room: string): Observable<Device[]>;
  abstract getAllDevices(): Observable<Device[]>;
}
