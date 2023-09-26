import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Device } from '../../models/device';
import { Scope } from '../../models/scope';
import { DeviceService } from '../device-service';

export interface ScopeFilter {
    scope: Scope;
    scopeValue: string;
}

const DEFAULT_FILTER: ScopeFilter = {
  scope: Scope.All,
  scopeValue: ''
}


@Injectable()
export class FilterService {
  private scopeFilterSubject: Subject<ScopeFilter> = new BehaviorSubject(DEFAULT_FILTER);
  private scopeValue: string = '';
  constructor(private deviceService: DeviceService) { }

  public getRoomList(): Observable<Device[]> {
    return this.deviceService.getListOfRoom();
  }

  public getDeviceList(room: string): Observable<Device[]> {
    return this.deviceService.getListOfDevices(room);
  }

  public setSelectedRoom(room: string): void {
    this.scopeValue = room;

    if (room === 'all') {
      this.scopeValue = '';
    }
    this.updateScope(false);
  }

  public setSelectedDevice(device: string): void {
    var values = this.scopeValue.split('/')
    this.scopeValue = `${values[0]}/${device}`
    
    if(device === 'all') {
      this.scopeValue = `${values[0]}`
    }
    this.updateScope(true);
  }

  public getScopeFilter() {
    return this.scopeFilterSubject;
  }

  private updateScope(withDevice: boolean) {
    const scopeFilter: ScopeFilter = {
      scope: Scope.All,
      scopeValue: '',
    };
    if(withDevice) {
      scopeFilter.scope = Scope.Device;
      scopeFilter.scopeValue = this.scopeValue;
    } 
    
    if(!withDevice && this.scopeValue.length > 0) {
      scopeFilter.scope = Scope.Room;
      scopeFilter.scopeValue = this.scopeValue;
    }

    this.scopeFilterSubject.next(scopeFilter);
  }

}
