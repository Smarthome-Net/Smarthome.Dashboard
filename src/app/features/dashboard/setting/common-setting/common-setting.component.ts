import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { CommonSetting } from '@models';
import { SettingService, } from '@services/setting-service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColorPresetPickerComponent, Theme } from '@shared';
import { AppSettingService } from '@services/app-setting-service';

type SnackMessage = { 
  message: string,
  action: string
}

const Messages: { [key: number]: SnackMessage } = {
  '-1': {
    message: 'Fehler beim aktualisieren',
    action: 'Hilfe!'
  } ,
  0: {
    message: 'Einstellungen konnten nicht aktualisiert werden',
    action: 'Okay'
  },
  1: {
    message: 'Einstellungen aktualisiert',
    action: 'Alles klar'
  }
}


@Component({
    selector: 'app-common-setting',
    templateUrl: './common-setting.component.html',
    styleUrls: ['./common-setting.component.scss'],
    imports: [
      FormsModule,
      MatFormField,
      MatLabel,
      MatInput,
      MatButton,
      ColorPresetPickerComponent, 
      FormField
    ]
})
export class CommonSettingComponent implements OnInit {
  private settingService = inject(SettingService);
  private appSettingService = inject(AppSettingService);
  private snackBar = inject(MatSnackBar);
  private commonSetting = signal<CommonSetting>({
    id: '',
    title: '',
    description: '',
    pageLength: 10,
    theme: 'lime-pink',
    type: ''
  });

  commonSettingForm = form(this.commonSetting);

  private resetValue = signal<CommonSetting | undefined>(undefined);

  constructor() { }

  ngOnInit() {
    this.settingService.getCommonSetting().subscribe(setting => {
      this.commonSetting.set(setting);
      this.resetValue.set(setting);
    })
  }

  updateSetting() {
    const commonSetting = this.commonSetting();

    this.settingService.updateCommonSetting(commonSetting).subscribe(result => {
      this.showNotification(result);
      const hasChanges = result > 0 ? true : false;
      this.appSettingService.updateCommonSetting({ 
        theme: commonSetting.theme, 
        title: commonSetting.title, 
        pageLength: commonSetting.pageLength 
      });
      this.settingService.notifyClose(hasChanges);
    })
  }

  reset() {
    this.commonSetting.set(this.resetValue()!);
  }

  private showNotification(result: number) {
    var snack = Messages[result];
    this.snackBar.open(snack.message, snack.action, {
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
      duration: 5000
    })
  }
}
