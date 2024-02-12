import { HttpClient } from '@angular/common/http';
import { Inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { ENV } from 'src/environments/environment.provider';
import { IEnvironment } from 'src/environments/ienvironment';
import { Device } from '@models';
import { DeviceService } from './device-service';

@Injectable()
export class DeviceServiceImpl extends DeviceService {
  public constructor(@Inject(ENV) env: IEnvironment, private httpclient: HttpClient) {
    super(env, 'device');
  }

  getListOfRoom(): Observable<Device[]> {
    return this.httpclient.get<Device[]>(`${this.path}/rooms`);
  }

  getAllDevices(): Observable<Device[]> {
    return this.httpclient.get<Device[]>(`${this.path}`);
  }

  getListOfDevices(room: string): Observable<Device[]> {
    return this.httpclient.get<Device[]>(`${this.path}/${room}`);
  }

}
