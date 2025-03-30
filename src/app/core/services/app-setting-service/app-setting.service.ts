import { inject, Injectable } from '@angular/core';
import { AppSettingService } from './app-setting-service';
import { SettingService } from '@services/setting-service';
import { CommonSettingStorage } from '@models';
import { Observable, ReplaySubject } from 'rxjs';

const CommonSettingKey = 'commonSetting';

@Injectable()
export class AppSettingServiceImpl extends AppSettingService {
  private settingService = inject(SettingService);
  private commonSetting;

  override $commonSetting: Observable<CommonSettingStorage>;
  
  constructor() {
    super();
    this.commonSetting = new ReplaySubject<CommonSettingStorage>();
    this.$commonSetting = this.commonSetting.asObservable();
  }

  override initSettings(): void {
    const setting = localStorage.getItem(CommonSettingKey)
    if(setting) {
      this.commonSetting.next(JSON.parse(setting));
      return;
    }

    this.settingService.getCommonSetting().subscribe(response => {
      this.updateCommonSetting(response);
    })
  }

  override updateCommonSetting(commonSetting: CommonSettingStorage): void {
    localStorage.setItem(CommonSettingKey, JSON.stringify(commonSetting));
    this.commonSetting.next(commonSetting);
  }

}
