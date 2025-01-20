/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardViewBarComponent } from './dashboard-view-bar.component';

describe('DashboardViewBarComponent', () => {
  let component: DashboardViewBarComponent;
  let fixture: ComponentFixture<DashboardViewBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [DashboardViewBarComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardViewBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
