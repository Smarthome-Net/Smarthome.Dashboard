import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { SharedModule } from '@shared/shared.module';
import { SettingRoutingModule } from './setting-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonSettingComponent } from './common-setting/common-setting.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        SettingRoutingModule,
        SettingComponent,
        CommonSettingComponent,
    ]
})
export class SettingModule { }
