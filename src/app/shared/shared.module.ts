import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MAT_PAGINATOR_DEFAULT_OPTIONS,
   MatPaginatorDefaultOptions, 
   MatPaginatorIntl, 
   MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule }  from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatExpansionModule
],
  providers: [
    { provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useValue: matPaginatorOptions },
    { provide: MatPaginatorIntl, useClass: GermanPaginatorIntl }
  ]
})
export class SharedModule { }
