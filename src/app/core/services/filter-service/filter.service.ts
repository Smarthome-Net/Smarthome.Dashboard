import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Device, ScopeType, Scope } from '@models';
import { DeviceService } from '../device-service';
import { FilterService } from './filter-service';

const ALL_FILTER: Scope = {
  scopeType: ScopeType.All,
  value: ''
}

const ROOM_FILTER: Scope = {
  scopeType: ScopeType.Room,
  value: ''
}

const DEVICE_FILTER: Scope = {
  scopeType: ScopeType.Device,
  value: ''
}

@Injectable()
export class FilterServiceImpl extends FilterService {
  private scopeFilterSubject: Subject<Scope> = new BehaviorSubject(ALL_FILTER);
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
      this.updateScope(ScopeType.All);
      return;
    }

    this.scopeValue = room;
    this.updateScope(ScopeType.Room);
  }

  public setSelectedDevice(device: string): void {
    var values = this.scopeValue.split('/');
    if(device === 'all') {
      this.scopeValue = `${values[0]}`
      this.updateScope(ScopeType.Room);
      return;
    }

    this.scopeValue = `${values[0]}/${device}`
    this.updateScope(ScopeType.Device);
  }

  public scopeFilter(): Observable<Scope> {
    return this.scopeFilterSubject;
  }

  public destroy(): void {
    this.scopeFilterSubject.unsubscribe();

    this.scopeFilterSubject = new BehaviorSubject(ALL_FILTER);
  }

  private updateScope(scope: ScopeType) {
    let scopeFilter = ALL_FILTER;
    switch (scope) {
      case ScopeType.Room:
        scopeFilter = ROOM_FILTER;
        scopeFilter.value = this.scopeValue;
        break;
      case ScopeType.Device:
        scopeFilter = DEVICE_FILTER;
        scopeFilter.value = this.scopeValue;
        break;
    }

    this.scopeFilterSubject.next(scopeFilter);
  }
}
