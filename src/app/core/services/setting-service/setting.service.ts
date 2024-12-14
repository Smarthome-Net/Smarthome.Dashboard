import { Injectable, inject } from '@angular/core';
import { SettingService } from './setting-service';
import { CommonSetting, PageSetting, Setting } from '@models';
import { Observable } from 'rxjs';
import { ENV, IEnvironment } from '@env';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingServiceImpl extends SettingService  {
  private httpClient = inject(HttpClient);

  constructor() {
    const env = inject<IEnvironment>(ENV);
    super(env, 'setting')
  }

  override getAllSettings(): Observable<Setting[]> {
    return this.httpClient.get<Setting[]>(this.path);
  }

  override getCommonSetting(): Observable<CommonSetting> {
    return this.httpClient.get<CommonSetting>(`${this.path}/commonsetting`);
  }
}
