/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommonSettingComponent } from './common-setting.component';

describe('CommonSettingComponent', () => {
  let component: CommonSettingComponent;
  let fixture: ComponentFixture<CommonSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [CommonSettingComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
