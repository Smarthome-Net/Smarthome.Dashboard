import { Component, OnInit } from '@angular/core';
import { Setting } from '@models';
import { SettingService } from '@services/setting-service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  public settings: Setting[] = []
   
  constructor(private settingService: SettingService) { }

  ngOnInit() {
    this.settingService.getAllSettings().subscribe(settings => {
      this.settings = settings;
    });
  }

}
