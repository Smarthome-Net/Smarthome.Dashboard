import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Device, Scope, ScopeFilter } from '@models';
import { DeviceService } from '../device-service';
import { FilterService } from './filter-service';

const ALL_FILTER: ScopeFilter = {
  scope: Scope.All,
  scopeValue: ''
}

const ROOM_FILTER: ScopeFilter = {
  scope: Scope.Room,
  scopeValue: ''
}

const DEVICE_FILTER: ScopeFilter = {
  scope: Scope.Device,
  scopeValue: ''
}

@Injectable()
export class FilterServiceImpl extends FilterService {
  private scopeFilterSubject: Subject<ScopeFilter> = new BehaviorSubject(ALL_FILTER);
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
    if (room === 'all') {
      this.scopeValue = '';
      this.updateScope(Scope.All);
      return;
    }

    this.scopeValue = room;
    this.updateScope(Scope.Room);
  }

  public setSelectedDevice(device: string): void {
    var values = this.scopeValue.split('/');
    if(device === 'all') {
      this.scopeValue = `${values[0]}`
      this.updateScope(Scope.Room);
      return;
    }

    this.scopeValue = `${values[0]}/${device}`
    this.updateScope(Scope.Device);
  }

  public scopeFilter(): Observable<ScopeFilter> {
    return this.scopeFilterSubject;
  }

  public destroy(): void {
    this.scopeFilterSubject.unsubscribe();

    this.scopeFilterSubject = new BehaviorSubject(ALL_FILTER);
  }

  private updateScope(scope: Scope) {
    let scopeFilter = ALL_FILTER;
    switch (scope) {
      case Scope.Room:
        scopeFilter = ROOM_FILTER;
        scopeFilter.scopeValue = this.scopeValue;
        break;
      case Scope.Device:
        scopeFilter = DEVICE_FILTER;
        scopeFilter.scopeValue = this.scopeValue;
    }

    this.scopeFilterSubject.next(scopeFilter);
  }
}
