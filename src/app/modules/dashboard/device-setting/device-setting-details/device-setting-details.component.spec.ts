/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeviceSettingDetailsComponent } from './device-setting-details.component';

describe('DeviceSettingDetailsComponent', () => {
  let component: DeviceSettingDetailsComponent;
  let fixture: ComponentFixture<DeviceSettingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [DeviceSettingDetailsComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSettingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
