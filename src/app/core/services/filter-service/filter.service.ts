import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ScopeType, Scope } from '@models';
import { ALL, FilterService } from './filter-service';

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
  
  constructor() { 
    super();
  }

  public scopeFilter(): Observable<Scope> {
    return this.scopeFilterSubject;
  }

  public updateScope(value: string): void {
    let scopeFilter = ALL_FILTER;
    if (value !== ALL) {
      scopeFilter = ROOM_FILTER;
      scopeFilter.value = value;
    }

    if (value.includes('/')) {
      scopeFilter = DEVICE_FILTER;
      scopeFilter.value = value;
    }

    this.scopeFilterSubject.next(scopeFilter);
  }

  public destroy(): void {
    this.scopeFilterSubject.unsubscribe();

    this.scopeFilterSubject = new BehaviorSubject(ALL_FILTER);
  }
}
