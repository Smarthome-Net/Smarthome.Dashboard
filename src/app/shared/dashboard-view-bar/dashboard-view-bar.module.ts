import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardViewBarComponent } from './dashboard-view-bar.component';
import { DashboardViewTitleDirective } from './dashboard-view-title.directive';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardViewActionsDirective } from './dashboard-view-actions.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  declarations: [
    DashboardViewBarComponent,
    DashboardViewTitleDirective,
    DashboardViewActionsDirective,
    DashboardViewActionsDirective
  ],
  exports: [
    DashboardViewBarComponent,
    DashboardViewTitleDirective,
    DashboardViewActionsDirective
  ]
})
export class DashboardViewBarModule { }
