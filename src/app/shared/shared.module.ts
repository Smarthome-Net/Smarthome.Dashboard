import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardViewBarModule } from './dashboard-view-bar/dashboard-view-bar.module';
import { NavbarModule } from './navbar/navbar.module';
import { NavbarCollapsedModule } from './navbar-collapsed/navbar-collapsed.module';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ],
  exports: [
    NavbarModule,
    NavbarCollapsedModule,
    DashboardViewBarModule,

    NgApexchartsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTableModule,
    MatTooltipModule,
    MatInputModule
  ]
})
export class SharedModule { }
