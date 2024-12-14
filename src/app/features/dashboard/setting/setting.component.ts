import { Component, OnInit, inject } from '@angular/core';
import { Setting } from '@models';
import { SettingService, SettingServiceProvider } from '@services/setting-service';
import { CommonSettingComponent } from './common-setting/common-setting.component';
import { DashboardViewBarComponent, DashboardViewTitleDirective } from '@shared';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelContent } from '@angular/material/expansion';
import { NgComponentOutlet } from '@angular/common';

const templateMap: { [key: string]: any } = {
  'CommonSetting': CommonSettingComponent,
}

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss'],
    imports: [ DashboardViewBarComponent, 
      DashboardViewTitleDirective, 
      MatAccordion, 
      MatExpansionPanel, 
      MatExpansionPanelHeader, 
      MatExpansionPanelTitle, 
      MatExpansionPanelContent, 
      NgComponentOutlet
    ],
    providers: [
      SettingServiceProvider
    ]
})
export class SettingComponent implements OnInit {
  private settingService = inject(SettingService);

  settings: Setting[] = []

  constructor() { }

  ngOnInit() {
    this.settingService.getAllSettings().subscribe(settings => {
      this.settings = settings;
    });
  }

  getTemplate(type: string) {
    return templateMap[type]
  }
}
