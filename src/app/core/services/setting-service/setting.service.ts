import { Inject, Injectable } from '@angular/core';
import { SettingService } from './setting-service';
import { CommonSetting, PageSetting, Setting } from '@models';
import { Observable } from 'rxjs';
import { ENV, IEnvironment } from '@env';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingServiceImpl extends SettingService  {

  constructor(@Inject(ENV) env: IEnvironment, private httpClient: HttpClient) { 
    super(env, 'setting')
  }

  public override getAllSettings(): Observable<Setting[]> {
    return this.httpClient.get<Setting[]>(this.path);
  }

  public override getCommonSetting(): Observable<CommonSetting> {
    return this.httpClient.get<CommonSetting>(`${this.path}/commonsetting`);
  }
}
