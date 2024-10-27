import { Inject, Injectable } from '@angular/core';
import { SettingService } from './setting-service';
import { Setting } from '@models';
import { Observable } from 'rxjs';
import { ENV } from 'src/environments/environment.provider';
import { IEnvironment } from 'src/environments/ienvironment';
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

}
