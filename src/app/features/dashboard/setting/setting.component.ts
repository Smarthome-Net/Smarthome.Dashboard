import { Component, OnInit, Type, inject, viewChild } from '@angular/core';
import { Setting } from '@models';
import { SettingService, SettingServiceProvider } from '@services/setting-service';
import { CommonSettingComponent } from './common-setting/common-setting.component';
import { DashboardViewBarComponent, DashboardViewTitleDirective } from '@shared';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelContent } from '@angular/material/expansion';
import { NgComponentOutlet } from '@angular/common';

const templateMap: { [key: string]: Type<any> } = {
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
      NgComponentOutlet,
    ],
    providers: [
      SettingServiceProvider
    ]
})
export class SettingComponent implements OnInit {
  private settingService = inject(SettingService);

  expansionPanel = viewChild(MatExpansionPanel);
  
  settings: Setting[] = []

  constructor() { }
  
  ngOnInit() {
    this.settingService.getAllSettings().subscribe(settings => {
      this.settings = settings;
    });

    this.settingService.onClose().subscribe(result => {
      if(result) {
        this.expansionPanel()?.close();
      }
    })
  }

  getTemplate(type: string): Type<any> {
    return templateMap[type]
  }
}
