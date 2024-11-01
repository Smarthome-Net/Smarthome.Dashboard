import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SettingService } from '@services/setting-service';

@Component({
  selector: 'app-common-setting',
  templateUrl: './common-setting.component.html',
  styleUrls: ['./common-setting.component.scss']
})
export class CommonSettingComponent implements OnInit {

  public commonSettingForm = this.formBuilder.group({
    title: this.formBuilder.control(""),
    description: this.formBuilder.control(""),
    pageLength: this.formBuilder.control(10),
    color: this.formBuilder.group({
      primary: this.formBuilder.control(""),
      secondary: this.formBuilder.control("")
    })
  });

  constructor(private settingService: SettingService, private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.settingService.getCommonSetting().subscribe(setting => {
      console.log(setting);
      this.commonSettingForm.patchValue(setting)
    })
  }

}
