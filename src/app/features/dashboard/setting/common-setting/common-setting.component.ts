import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonSetting } from '@models';
import { SettingService, } from '@services/setting-service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColorPresetPickerComponent } from '@shared';

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
    imports: [FormsModule, 
      ReactiveFormsModule, 
      MatFormField, 
      MatLabel, 
      MatInput,
      MatButton,
      ColorPresetPickerComponent,
    ]
})
export class CommonSettingComponent implements OnInit {
  private settingService = inject(SettingService);
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);


  commonSettingForm = this.formBuilder.group({
    title: this.formBuilder.control(""),
    description: this.formBuilder.control(""),
    pageLength: this.formBuilder.control(10),
    color: this.formBuilder.group({
      primary: this.formBuilder.control(""),
      secondary: this.formBuilder.control("")
    })
  });

  private resetValue?: CommonSetting;

  constructor() { }

  ngOnInit() {
    this.settingService.getCommonSetting().subscribe(setting => {
      this.resetValue = setting;
      
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
    const updated = this.commonSettingForm.value;
    this.settingService.updateCommonSetting({
      title: updated.title!,
      description: updated.description!,
      pageLength: updated.pageLength!,
      id: this.resetValue!.id,
      type: this.resetValue!.type,
      colorScheme: {
        primary: {
          blue: 0,
          green: 0,
          red: 0,
        },
        secondary: {
          blue: 0,
          green: 0,
          red: 0,
        }
      }
    }).subscribe(result => {
      this.showNotification(result);
      const hasChanges = result > 0 ? true : false;
      this.settingService.notifyClose(hasChanges);
    })
  }

  reset() {
    this.commonSettingForm.reset();
    this.commonSettingForm.setValue({
      title: this.resetValue!.title,
      description: this.resetValue!.description,
      pageLength: this.resetValue!.pageLength,
      color: {
        primary: null,
        secondary: null
      }
    });
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
