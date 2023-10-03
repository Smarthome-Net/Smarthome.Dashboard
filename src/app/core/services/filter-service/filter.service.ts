import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Device, Scope, ScopeFilter } from '@models';
import { DeviceService } from '../device-service';
import { FilterService } from './filter-service';

const DEFAULT_FILTER: ScopeFilter = {
  scope: Scope.All,
  scopeValue: ''
}

@Injectable()
export class FilterServiceImpl extends FilterService {
  private scopeFilterSubject: Subject<ScopeFilter> = new BehaviorSubject(DEFAULT_FILTER);
  private scopeValue: string = '';
  
  constructor(private deviceService: DeviceService) { 
    super();
  }

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

  public get scopeFilter() {
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
