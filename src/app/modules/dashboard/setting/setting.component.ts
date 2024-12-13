import { Component, OnInit } from '@angular/core';
import { Setting } from '@models';
import { SettingService } from '@services/setting-service';
import { CommonSettingComponent } from './common-setting/common-setting.component';

const templateMap: { [key: string]: any } = {
  'CommonSetting': CommonSettingComponent,
}

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  standalone: false
})
export class SettingComponent implements OnInit {
  public settings: Setting[] = []
   
  constructor(private settingService: SettingService) { }

  ngOnInit() {
    this.settingService.getAllSettings().subscribe(settings => {
      this.settings = settings;
    });
  }

  getTemplate(type: string) {
    return templateMap[type]
  }
}
