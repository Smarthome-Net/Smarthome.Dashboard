import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorDefaultOptions, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardViewBarModule } from './dashboard-view-bar/dashboard-view-bar.module';
import { NavbarModule } from './navbar/navbar.module';
import { NavbarCollapsedModule } from './navbar-collapsed/navbar-collapsed.module';
import { DeviceFilterModule } from './device-filter/device-filter.module';
import { GermanPaginatorIntl } from './german-paginator-intl';

const matPaginatorOptions: MatPaginatorDefaultOptions = {
  formFieldAppearance: 'fill',
};

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
    DeviceFilterModule,

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
    MatInputModule,
  ],
  providers: [
    { provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useValue: matPaginatorOptions },
    { provide: MatPaginatorIntl, useClass: GermanPaginatorIntl }
  ]
})
export class SharedModule { }
