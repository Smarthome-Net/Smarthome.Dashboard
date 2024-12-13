import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonSetting } from '@models';
import { SettingService } from '@services/setting-service';

@Component({
  selector: 'app-common-setting',
  templateUrl: './common-setting.component.html',
  styleUrls: ['./common-setting.component.scss'],
  standalone: false
})
export class CommonSettingComponent implements OnInit {

  commonSettingForm = this.formBuilder.group({
    title: this.formBuilder.control(""),
    description: this.formBuilder.control(""),
    pageLength: this.formBuilder.control(10),
    color: this.formBuilder.group({
      primary: this.formBuilder.control(""),
      secondary: this.formBuilder.control("")
    })
  });

  private resetValue = '';

  constructor(private settingService: SettingService, private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.settingService.getCommonSetting().subscribe(setting => {
      this.resetValue = JSON.stringify(setting);
      
      this.commonSettingForm.setValue({
        title: setting.title,
        description: setting.description,
        pageLength: setting.pageLength,
        color: {
          primary: null,
          secondary: null
        }
      })
    })
  }

  updateSetting() {
    console.log(this.commonSettingForm.value);
  }

  reset() {
    var value = JSON.parse(this.resetValue) as CommonSetting;
    this.commonSettingForm.reset();
    this.commonSettingForm.setValue({
      title: value.title,
      description: value.description,
      pageLength: value.pageLength,
      color: {
        primary: null,
        secondary: null
      }
    });
  }
}
