import { inject, Injectable } from '@angular/core';
import { AppSettingService } from './app-setting-service';
import { SettingService } from '@services/setting-service';
import { CommonSettingStorage } from '@models';
import { Observable, ReplaySubject } from 'rxjs';
import { StorageManagerService } from '@services/storage-manager';

const CommonSettingKey = 'commonSetting';

@Injectable()
export class AppSettingServiceImpl extends AppSettingService {
  private settingService = inject(SettingService);
  private localStorage = inject(StorageManagerService);
  private commonSetting;

  override $commonSetting: Observable<CommonSettingStorage>;
  
  constructor() {
    super();
    this.commonSetting = new ReplaySubject<CommonSettingStorage>();
    this.$commonSetting = this.commonSetting.asObservable();
  }

  override initSettings(): void {
    const setting = this.localStorage.getValue<CommonSettingStorage>(CommonSettingKey);
    if(setting) {
      this.commonSetting.next(setting);
      return;
    }

    this.settingService.getCommonSetting().subscribe(response => {
      this.updateCommonSetting(response);
    })
  }

  override updateCommonSetting(commonSetting: CommonSettingStorage): void {
    this.localStorage.setValue(CommonSettingKey, commonSetting);
    this.commonSetting.next(commonSetting);
  }

}
